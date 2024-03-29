# EPSjs

## Introduction

epsJS(Express Portable Server) is an ExpressJS-based tool for quickly building a configurable nodeJS application server.

---
## Usage

  ```js
  const epsjs = require('epsjs')

  // multi line
  const server = new epsjs
  server.add.route({
    method: 'get',
    path: '/',
    callback(req,res,next){
      res.send('hello world')
    }
  })
  server.run()

  // one line

  (new epsjs)
    .add.route({method: 'get',path: '/',callback(req,res,next){res.send('hello world')}})
    .run()
  ```

---
## Methods

### On
  - Error: Define a error handling middleware. 
    ```js
    server.on.error((err, req, res, next)=>{res.send('error')})
    ```
  - Param: Define callback triggers to route parameters. 
    ```js
    server.on.param('param',(err, req, res, value)=>{console.log('param => ',value)})
    ```


### Add
  - dir: Add a server static folder.
    ```js
    server.add.dir('/url/path/','folder/path')
    // or
    server.add.dir(
      ['/url/path/1/','folder1/path'],
      ['/url/path/2/','folder2/path'],
    )
    ```
  - middleware: Add a server route.
    ```js
    // gblobal
    server.add.middleware((req,res;next) => { console.log("my middleware") })
    // on specifique path
    server.add.middleware('/url/path/',(req,res;next) => { console.log("my middleware") })
    // multiple middleware
    server.add.middleware(
      (req,res;next) => { console.log("my first middleware") },
      ['/url/path/',(req,res;next) => { console.log("my second middleware") }]
    )
    ```
  - route: Add a server route.
    ```js
    server.add.route({method: 'get',path: '/',callback(req,res,next){res.send('hello world')}})
    ```
  - setting: Add a setting.
    ```js
    server.add.setting('setting name', 'setting value')
    ```
  - setting: Add a websocket.
    ```js
    server.add.webSocket({attach(server){/* that method will receive the http server object */}}) 
    ```

### Run
  build and run the server on the port passed.
  ```js
  server.run() // default 3000
  ```

