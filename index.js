import { www } from './www/index.js'

class EPS {
  #serverData
  #plugin
  #demo_data
  constructor(){
    this.#serverData = {
      accesses: [],
      routes:   [],
      settings: [],
      middlewares: [],
      queryHandlers: [],
      errorHandler(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        this.get('view engine')?res.render('error'):res.sendFile(import.meta.url.replace('index.js','views/error.html').slice(10));
      },
    }
    this.#plugin={}
    this.#demo_data=[{appName:"EPS",routes:['demo'],accesses:['demo'],settings:[],middlewares:[],queryHandlers:['demo'], errorHandler: this.#serverData.errorHandler},{}]
  }

  param (...params) {
    const addQueryHandler = (setting) => { setting.length && (this.#serverData.queryHandler.push(setting))}
    Array.isArray(params[0]) ? params.forEach(addQueryHandler) : addQueryHandler(params)
  }
  onError (callback) {
    callback instanceof Function ? this.#serverData.errorHandler = callback : console.error(callback,' is not a function')
  }
  route (...routes_data) { routes_data.forEach(route_data => route_data && this.#serverData.routes.push(route_data) ) }
  access (...accesses) { accesses.forEach(access_data => access_data && this.#serverData.accesses.push(access_data) ) }
  use   (...middlewares_data) { middlewares_data.forEach(middleware_data => middleware_data && this.#serverData.middlewares.push(middleware_data) ) }
  set   (...params) {
    const addSettings = (setting) => { setting.length && (this.#serverData.settings.push(setting)) }
    Array.isArray(params[0]) ? params.forEach(addSettings) : addSettings(params)
  }
  webSocket(WS){ this.#plugin.webSocket = WS }
  run(port=3000) { Object.entries(www(this.#serverData, this.#plugin, port)).forEach( ([key,val]) => { this[key] = val }) }
  demo(port=3000) { Object.entries(www(...this.#demo_data,port)) }

}
export { EPS }