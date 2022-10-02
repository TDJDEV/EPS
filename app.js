
const { json, urlencoded } = express = require('express');
const accesses = require('./server/accesses/index.js')
const base = require('./server/base/index.js')
const errorHandler = require('./server/errorHandler/index.js')
const middlewares = require('./server/middlewares/index.js')
const queryHandlers = require('./server/queryHandlers/index.js')
const routes = require('./server/routes/index.js')
const settings = require('./server/settings/index.js')

function app(params) {
  const mods={accesses,errorHandler,middlewares,queryHandlers,routes,settings}

  return Object.entries(params).reduce((app, [key,values])=>{
    !['appName','port'].includes(key)&&mods[key].call(app, values, express)
    return app
  }, base(express(), json, urlencoded));

}
module.exports = app
