# vue-promise

1. 什么是promise？

    + 是JS的一种异步编程的解决方案。
    + promise对异步操作进行封装，解决回调地狱的问题。

2. 使用

    ``` javascript
      new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve() // resolve()进入then
          }, 1000)
      }).then(() => {
          console.log('111')
          // 第一次处理代码
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve()
              }, 1000)
          })
      }).then(() => {
          console.log('222')
          // 第二次处理代码
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve()
              }, 1000)
          })
      }).then(() => {
          // 第三次处理代码
          console.log('333')
      })
    ```

3. 传参
  
    ``` javascript
      new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve('Hello world')
          }, 1000)
      }).then((data) => {
          // data处理代码
          console.log(data)
      })
    ```

4. 请求失败

    ``` javascript
      new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve() // 进入then
              reject() // 进入catch
          }, 1000)
      }).then(() => {}).catch((err) => {
          console.log(err)
      })
    ```

5. 三种状态

    + pending 等待
    + fullfill 满足，调用resolve，回调.then()
    + reject 拒绝，调用reject，回调.catch()

6. promise另外的处理形式

    ``` javascript
      new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve()
          }, 1000)
      }).then(data => {
          console.log(data)
      }, err => {
          console.log(err)
      })
    ```

7. 简写

    ``` javascript
      return new Promise((resolve) => {
          ...resolve(res)
      })
      // == return Promise.resolve(res)
      // == return res
    ```

8. 简写

    ``` javascript
      return new Promise((reject) => {
          ...reject(res)
      })
      // == return Promise.reject(res)
      // == throw res
    ```

9. 多个请求同时满足

    ``` javascript
      Promise.all([
          new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve('aaa')
              }, 1000)
          }),
          new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve('bbb')
              }, 2000)
          })
      ]).then(results => {
          console.log(results)
          console.log(results[0])
          console.log(results[1])
      })
    ```
