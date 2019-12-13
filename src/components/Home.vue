<template>
  <div>
    <div id="rule"></div>
    <div id="left"
         v-on:click="show=!show">

    </div>
    <div id="middle"
         v-show="show">
      <div class="input_name"><input type="text"
               v-model="new_note_name"
               onfocus="if(value=='输入新文件名..')value=''" /></div>
      <div class="input_name"><input type="button"
               value="创建"
               v-on:click="submit_newnote_name" /></div>
      <ul>
        <li class="list-item"
            v-for="(item, index) in list"
            :key=index
            v-on:click="article(item)">{{ item.split("/").pop() }}</li>
      </ul>
    </div>
    <div id="right">
      <mavon-editor style="width: 100%;"
                    v-model="htmlMD"
                    @save="save_edit"></mavon-editor>
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
var qs = require("qs");

export default {
  name: "Home",
  data () {
    return {
      show: false,
      htmlMD: "",
      list: [],
      url_now: '',
      new_note_name: '输入新文件名..'
    };
  },
  components: {
    VueMarkdown,
    mavonEditor
  },
  methods: {
    get_list () {
      this.$axios.get("http://note.firslov.cn/list", {        params: {
          path: '.'
        }      }).then(response => {
        this.list = response.data;
      });
    },
    article (url) {
      this.url_now = url;
      url = encodeURIComponent(url);
      console.log(url)
      this.$axios.get("http://note.firslov.cn/list", {        params: {
          path: url
        }      }).then(response => {
        this.htmlMD = response.data;
        if (this.show === true) {
          this.show = false;
        }
      });
    },
    save_edit (value, render) {
      console.log(value)
      console.log(render)
      let data = { "data_url": this.url_now, "data_content": value };
      this.$axios.post("http://note.firslov.cn/save", data)
        .then(res => {
          console.log('res=>', res);
        })
    },
    submit_newnote_name () {
      if (this.new_note_name !== '输入新文件名..') {
        this.$axios.get("http://note.firslov.cn/newnote", {          params: {
            name: this.new_note_name
          }        }).then(() => {
          this.new_note_name = '';
          this.get_list();
        })
      }
    }
  },
  created () {
    this.get_list();
    this.article("dist/static/notes/Readme.md")
  },
  mounted () {
    document.getElementById('left').style.setProperty('height', (document.body.clientHeight - 20) + 'px')
    document.getElementById('middle').style.setProperty('height', (document.body.clientHeight - 20) + 'px')
    document.getElementById('right').style.setProperty('width', (document.body.clientWidth - 32) + 'px')
    console.log('height:' + document.body.clientHeight)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
  height: 100%;
}
#rule {
  position: relative;
}
#left {
  border-radius: 0.3rem;
  background-color: whitesmoke;
  float: left;
  width: 1.5rem;
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
}
#middle {
  border-radius: 0.3rem;
  background-color: whitesmoke;
  overflow: auto;
  width: 12rem;
  position: fixed;
  top: 0.5rem;
  left: 2.5rem;
  z-index: 1;
}

#right {
  float: left;
  position: absolute;
  left: 2.5rem;
  z-index: 0;
}

.list-item {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  font-size: 1rem;
}

.input_name {
  margin-top: 1rem;
  margin: auto;
  width: 60%;
  line-height: 3rem;
  text-align: center;
}
.input_name input {
  width: 100%;
  height: 1.8rem;
  line-height: 1.8rem;
  border-radius: 0.2rem;
  color: grey;
  text-align: center;
}
</style>
