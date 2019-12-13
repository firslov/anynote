# flask

## Debugger

+ Flask中的调试器拥有保护功能
+ PIN
+ 如果需要在页面中进行调试，需要输入PIN码进行确认

## Flask-Script

+ 可以添加Flask脚本的扩展库
+ 添加命令行参数
+ 使用
  + 安装：pip install flask-script
+ 初始化
  + 使用app构建Manager对象
+ 调用
  + runserver
    + -d 调试模式
    + -r 自动重新加载
    + -p 端口
    + -h 主机
    + --threaded 开启多线程
  + Shell

## 路由的管理

+ 使用的时候容易出现循环引用的问题
+ 使用懒加载的方法
  + 使用函数调用的形式进行加载
+ 使用新方案解决——蓝图
  + 代表一种规划
  + 路由的规划
+ flask-blueprint
  + pip install flask-blueprint

## 数据库

+ Web开发中大多使用关系型数据库
+ ORM
  + SQLAlchemy
+ Flask-SQLAlchemy
  + pip install flask-sqlalchemy

## Linux

+ 环境变量
  + 系统级
    + /etc/enviroment
    + /etc/profile
  + 用户级
    + ~/.bashrc
  + 临时级
    + 在窗口中直接export

## 公司开发环境

+ 开发环境
  + 开发人员使用
+ 测试环境
  + 测试人员使用
+ 演示环境
  + 给产品看的
  + 做演习，彩排
+ 生产环境，线上环境
  + 真实环境
  + 给用户看的
  