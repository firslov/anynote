# vue-router

1. 安装

   ```sh
   npm install vue-router --save
   ```

2. 配置

   - 新建 router 文件夹
   - index.js

     ```javascript
       // 导入vuerouter插件
       Vue.use(vueRouter)
       // 配置路由映射关系
       const routes = [{
           path: '/..',
           component: ..
       }, {
           path: '/..',
           component: ..
       }]
       // 创建路由实例
       const router = new VueRouter({
           routes
       })
       // 导出路由
       export default router
     ```

   - main.js

     ```javascript
     import router from '../router'
     const app = new Vue({
       el: '#app',
       router
     })
     ```

3. router-link

   ```html
   <router-link to="/home" tag="button" replace active-class="active">
     点击
   </router-link>
   ```

   - to='/home' 路由跳转
   - tag='button' 渲染成的标签
   - replace / push（默认）
   - active-class 活跃状态类

4. router-view 占位

   ```html
   <router-view> </router-view>
   ```

5. 重定向

   ```js
   redirect: '/home'
   ```

6. 路由模式

   ```js
     mode 'history' / 'hash'
   ```

7. 代码跳转

   ```js
   this.$router.push() // 可以后退
   ```

   ```js
   this.$router.replace() // 不能后退
   ```

8. 动态路由 /user/abc

   ```html
   <router-link to="/user/zhangsan"></router-link>
   <!-- path: '/user/:userId' -->
   ```

9. 获取动态路由值

   ```javascript
   // this.$router //路由对象
   this.$route.params.userId //当前活跃路由
   ```

10. 路由懒加载

    ```javascript
      {
          path: '/home',
          component: () => import('../component/Home')
      }
      // const Home = () => import('../component/Home')
      // component: Home
    ```

11. 嵌套路由

    - 创建子组件
    - 组件内部使用 router-view

      ```javascript
        {
            path: '/home',
            component: Home,
            children: [{ //默认路径
                    path: '',
                    redirect: 'news'
                },
                {
                    path: 'news',
                    component: 'HomeNews'
                },
                {
                    path: 'message',
                    component: 'HomeMessage'
                }
            ]
        }
      ```

12. 路由传参

    - params 类型
      - 路由 path '/home/:id'
      - router-link to="'/home/' + userid"
      - \$router.push('/home/' + this.userId)
      - \$route.params.id
    - query 类型

      - 路由 path 正常 '/home'
      - router-link 形式

        ```html
        <router-link to="{path:'/home', query:{name: 'abc'}}"></router-link>
        ```

        - to="{}" 是字符串
        - :to="{}" 是对象
        - URL: 协议://主机: 端口/路径? 查询
        - URL:scheme://host:port/path?query

      - 代码跳转

        ```javascript
        $route.push({
          path: '/home',
          query: {
            name: 'abc'
          }
        })
        ```

      - \$route.query.name

13. $router new的路由对象 / $route 当前活跃的路由

14. 所有组件继承自 vue 原型，下面代码会给所有组件增加 test 方法

    ```javascript
      Vue.prototype.test = {
          console.log("hello")
      }
    ```

15. 导航守卫

    - 全局守卫

      - 跳转前回调

        ```javascript
          router.beforeEach((to, from, next) => {
              document.title = to.meta.title
              // document.title = to.matched[0].meta.title //路由嵌套
              next() //必须调用
          }) {
              path: '/home',
              meta: { //元数据，描述数据的数据
                  title: '首页'
              },
              component: 'Home'
          }
        ```

      - 跳转后回调

        ```javascript
        router.afterEach((to, from) => {
          // 不调用next()
        })
        ```

    - 路由独享守卫
    - 组件内守卫

16. keep-alive

    - 形式

      ```html
        <keep-alive>
            <router-view>
        </keep-alive>
      ```

    - 两个函数

      ```javascript
        activated() {},
        deactivated() {}
      ```

    - 两个属性

      ```html
      <keep-alive exclude="a,b"></keep-alive>
      ```

      - include
      - exclude
