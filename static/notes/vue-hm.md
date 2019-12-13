# vue-黑马

1. 导入

   ```html
   <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
   ```

2. 基本结构

   ```js
   <script>
   var vm = new Vue({
    el: '#app',
    data: {
      msg: '123',
      msg2: '<h1>我是一个h1</h1>',
      mytitle: '自己定义的title'
    },
    methods: {
      show: function(){
        alert('Hello!')
      }
    }
   })
   </script>
   ```

3. 使用 v-cloak 可以解决插值表达式闪烁问题

   ```css
   <style>
     [v-cloak] {
       display: none;
     }
   </style>
   <p v-cloak>{{ msg }}</p>
   ```

4. 默认 v-text 没有闪烁问题，但会替换元素中原本内容；插值表达式只会替换自己的占位符

   ```html
   <div v-text="msg2">xxx</div>
   <div v-html="msg2">xxx</div>
   ```

5. v-bind: 是 vue 中用于绑定属性的指令，简写是:

   ```html
   <input type="button" value="按钮" v-bind:title="mytitle" />
   <input type="button" value="按钮" :title="mytitle" />
   ```

6. Vue 中提供了 v-on: 事件绑定机制，简写是@

   ```html
   <input type="button" value="按钮" v-bind:title="mytitle" v-on:click="show" />
   ```

7. 事件修饰器，可串联

   - .stop 阻止事件冒泡
   - .prevent 阻止默认行为
   - .capture 捕获机制
   - .self 只有自身事件才会触发
   - .once 只触发一次

8. 双向数据绑定 v-model ，只能用在表单元素中

   ```html
   <!-- input(radio text adress email ...) select checkbox textarea -->
   <!-- v-bind 只能实现数据的单向绑定，从 M 绑定到 V -->
   <input type="text" v-model="msg" style="width:100%" />
   ```

9. class 样式

   ```html
   <h1 class="red thin">这是个很大的h1！</h1>
   <!-- 直接传递数组， class 需要 v-bind 进行数据绑定 -->
   <!-- 在数组中使用三元表达式 -->
   <h1 :class="['thin', 'italic', flag?'active':'']">这也是个很大的h1！</h1>
   <!-- 数组中使用对象，代替三元表达式 -->
   <h1 :class="['thin', 'italic', {'active': flag}]">这个h1也很大！</h1>
   <!-- 使用对象形式，对象属性可不带引号 -->
   <h1 :class="{red:true, thin:true, italic:false}">这个h1也很大！</h1>
   <!-- vm.data 绑定 -->
   <h1 :class="classobj">这个h1也很大！</h1>
   <script>
     var vm = new Vue({
       el: '#app',
       data: {
         flag: true,
         classobj: {
           red: true,
           thin: true,
           italic: false
         }
       }
     })
   </script>
   ```

10. style 样式

    ```html
    <!-- v-bind 绑定属性 -->
    <h1 :style="{ color:'red', 'font-weight':'200' }">这是一个h1标题～</h1>
    <!-- data 上定义 -->
    <h1 :style="styleobj1">这是一个h1标题～</h1>
    <h1 :style="[ styleobj1, styleobj2 ]">这是一个h1标题～</h1>
    <script>
      var vm = new Vue({
        el: '#app',
        data: {
          styleobj1: {
            color: 'red',
            'font-weight': '200'
          },
          styleobj2: {
            'font-style': 'italic'
          }
        }
      })
    </script>
    ```

11. v-for 循环普通数组

    ```html
    <div id="app">
      <p>{{ list[0] }}</p>
      <p v-for="item in list">{{ item }}</p>
      <p v-for="(item, i) in list">{{ item }}的索引值为{{ i }}</p>
    </div>
    <script>
      var vm = new Vue({
        el: '#app',
        data: {
          list: [1, 2, 3, 4, 5, 6]
        },
        methods: {}
      })
    </script>
    ```

12. v-for 循环对象数组

    ```html
    <div id="app">
      <p v-for="(user, i) in list">
        {{ user.id }} ---- {{ user.name }} 索引为： {{ i }}
      </p>
    </div>
    <script>
      var vm = new Vue({
        el: '#app',
        data: {
          list: [
            {
              id: 1,
              name: 'zh1'
            },
            {
              id: 2,
              name: 'zh2'
            },
            {
              id: 3,
              name: 'zh3'
            },
            {
              id: 4,
              name: 'zh4'
            }
          ]
        },
        methods: {}
      })
    </script>
    ```

13. v-for 循环对象的键值对

    ```html
    <div id="app">
      <!-- 在遍历对象身上的键值对时，除了有 val key，在第三个位置还有个索引 -->
      <p v-for="(val, key, i) in user">
        值是： {{ val }} --- 键是： {{ key }} --- 索引是： {{ i }}
      </p>
    </div>
    <script type="text/javascript">
      var vm = new Vue({
        el: '#app',
        data: {
          user: {
            id: 1,
            name: '托尼',
            gender: '男'
          }
        },
        methods: {}
      })
    </script>
    ```

14. v-for 迭代数字

    ```html
    <div id="app">
      <!-- v-for 迭代数字，从1开始 -->
      <p v-for="count in 10">这是第 {{ count }} 次循环</p>
    </div>
    <script type="text/javascript">
      var vm = new Vue({
        el: '#app',
        data: {},
        methods: {}
      })
    </script>
    ```

15. v-for 中 key 属性的使用

    ```html
    <div id="app">
      <div>
        <label>Id:<input type="text" v-model="id"/></label>
        <label>Name:<input type="text" v-model="name"/></label>
        <input type="button" value="添加" v-on:click="add" />
      </div>
      <!-- v-for 循环的时候 key 属性只能使用 number 或 string -->
      <!-- key 在使用的时候，必须使用 v-bind 属性绑定的形式，指定 key 的值 -->
      <!-- 在组件中使用 v-for ，如果 v-for 有问题，必须在使用 v-for 的同时指定唯一的字符串/数字类型 :key 值 -->
      <p v-for="item in list" v-bind:key="item.id">
        <input type="checkbox" />
        {{ item.id }} --- {{ item.name }}
      </p>
    </div>
    <script type="text/javascript">
      var vm = new Vue({
        el: '#app',
        data: {
          id: '',
          name: '',
          list: [
            {
              id: 1,
              name: '李斯'
            },
            {
              id: 2,
              name: '赵高'
            },
            {
              id: 3,
              name: '嬴政'
            },
            {
              id: 4,
              name: '韩非'
            },
            {
              id: 5,
              name: '荀子'
            }
          ]
        },
        methods: {
          add() {
            //this.list.unshift 添加到前面
            this.list.push({
              id: this.id,
              name: this.name
            })
          }
        }
      })
    </script>
    ```

16. v-if 和 v-show

    ```html
    <div id="app">
      <input type="button" v-on:click="toggle" value="这是一个按钮" />
      <input type="button" v-on:click="flag = !flag" value="这也是一个按钮" />
      <!-- v-if 每次都会重新删除或创建元素 -->
      <!-- v-show 每次不会重新进行dom的删除和创建操作，只是切换了元素的 display:none 样式 -->
      <!-- v-if 有较高的切换性能消耗 -->
      <!-- v-show 有较高的初始渲染消耗 -->
      <!-- 如果元素涉及到频繁的切换，不要用 v-if ，推荐使用 v-show -->
      <!-- 如果元素可能永远也不会被显示出来被用户看到，推荐使用 v-if -->
      <h3 v-if="flag">这是v-if控制的元素</h3>
      <h3 v-show="flag">这是v-show控制的元素</h3>
    </div>
    <script type="text/javascript">
      var vm = new Vue({
        el: '#app',
        data: {
          flag: true
        },
        methods: {
          toggle() {
            this.flag = !this.flag
          }
        }
      })
    </script>
    ```

17. 总结

    ```html
    <!-- 1. MVC 和 MVVM 的区别 -->
    <!-- 2. 学习了 Vue 中最基本代码的结构 -->
    <!-- 3. 插值表达式 v-cloak v-text v-html v-bind（缩写是:） v-on（缩写是@） v-model v-for v-if v-show -->
    <!-- 4. 事件修饰符： .stop .prevent .capture .self .once -->
    <!-- 5. el：指定要控制的区域 data：是个对象，指定了控制区域内要用到的数据 methods：虽然带个s后缀，但是是个对象，这里可以自定义方法 -->
    <!-- 6. 在vm实例中，如果要访问 data 上的数据，或者要访问 methods 中的方法，必须带 this -->
    <!-- 7. 在 v-for 中要学会使用 key 属性（只接受string/number） -->
    <!-- 8. v-model 只能应用于表单元素 -->
    <!-- 9. 在 Vue 中绑定样式两种方式 v-bind:class v-bind:style -->
    ```

18. api

    ```js
    // 获取接口：http://www.liulongbin.top:3005/api/getprodlist
    // 添加接口：http://www.liulongbin.top:3005/api/addproduct
    // 删除接口：this.$http.get("http://www.liulongbin.top:3005/api/delproduct/" + id).then（）
    ```

19. Vue 提供的标签

    ```html
    <!-- component, template, transition, transitionGroup -->
    ```

20. Vue 属性

    ```html
    <script>
      var vm = new Vue({
        el: '#app',
        data: {},
        methods: {},
        filters: {},
        directives: {},
        components: {
          // 定义实例内部私有组件
          login1: {
            template: '<h1>这是私有的 login1 组件</h1>'
          },
          login2: {
            template: '#tmp2'
          }
        },
        // 生命周期钩子函数
        beforeCreated() {},
        created() {},
        beforeMount() {},
        mounted() {},
        beforeUpdated() {},
        updated() {},
        beforeDestroy() {},
        destroyed() {}
      })
    </script>
    ```
