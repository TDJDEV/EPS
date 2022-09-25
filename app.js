
import express, { json, urlencoded } from 'express';
import { base } from './server/base/index.js'
import { accesses } from './server/accesses/index.js'
import { errorHandler } from './server/errorHandler/index.js'
import { middlewares } from './server/middlewares/index.js'
import { queryHandlers } from './server/queryHandlers/index.js'
import { routes } from './server/routes/index.js'
import { settings } from './server/settings/index.js'

function app(params) {
  const mods={accesses,errorHandler,middlewares,queryHandlers,routes,settings}

  return Object.entries(params).reduce((app, [key,values])=>{
    !['appName','port'].includes(key)&&mods[key].call(app, values, express)
    return app
  }, base(express(), json, urlencoded));

}
export { app }