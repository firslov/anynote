var express = require("express");
var app = express();
var fs = require("fs");
var join = require("path").join;

app.use(express.static(join(__dirname, "dist")));

function getJsonFiles(jsonPath) {
  let jsonFiles = [];
  function findJsonFile(path) {
    let files = fs.readdirSync(path);
    files.forEach(function(item, index) {
      let fPath = join(path, item);
      let stat = fs.statSync(fPath);
      if (stat.isDirectory() === true) {
        findJsonFile(fPath);
      }
      if (stat.isFile() === true) {
        jsonFiles.push(fPath);
      }
    });
  }
  findJsonFile(jsonPath);
  return jsonFiles;
}

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

var bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
//在原有的基础上加上下面代码即可
app.use(bodyParser.json());

// get
app.get("/list", function(req, res) {
  // console.log(req);
  let url = decodeURIComponent(req.query.path);
  // console.log("url:" + decodeURIComponent(req.query.path));
  let stat = fs.statSync(url);
  if (url === ".") {
    data = getJsonFiles("static/notes");
    // console.log(data);
    res.end(JSON.stringify(data));
  }
  if (stat.isFile() === true) {
    file = fs.readFileSync(url);
    res.end(file);
  }
});

app.get("/newnote", function(req, res) {
  // console.log(req);
  let name = decodeURIComponent(req.query.name);
  console.log(name);
  full_name = "./static/notes/" + name + ".md";
  fs.writeFile(full_name, "", function(err) {
    if (err) {
      return console.log(err);
    }
  });
  res.end("ok");
});

// post
app.post("/save", function(req, res) {
  // console.log(req.body);
  fs.writeFile(req.body.data_url, req.body.data_content, function(error) {
    if (error) {
      console.log("写入失败");
    } else {
      console.log("写入成功了");
    }
  });
});

var server = app.listen(10001, function() {
  console.log("服务器启动在10001端口");
});
