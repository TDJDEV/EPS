const www = require('./www/index.js')
function toArray(x){
  return Array.isArray(x) ? x : [x]
}
class EPS {
  #serverData
  #plugin
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
        this.get('view engine')?res.render('error'):res.sendFile(__dirname+'\\views\\error.html');
      },
    }
    this.#plugin={}
    this.on = {
      param: (...params)=>{
        const addQueryHandler = (setting) => { setting.length && (this.#serverData.queryHandler.push(setting))}
        Array.isArray(params[0]) ? params.forEach(addQueryHandler) : addQueryHandler(params);
        return this
      },
      error: (callback)=>{
        callback instanceof Function ? this.#serverData.errorHandler = callback : console.error(callback,' is not a function')
        return this
      }
    }
    this.add = {
      dir:        (...accesses)         => {
        const addAccess = (access) => { access.length === 1 && access.unshift('/'), access.length && (this.#serverData.accesses.push(access)) }
        Array.isArray(accesses[0]) ? accesses.forEach( access => addAccess(toArray(access))) : addAccess(accesses);
        return this
      },
      middleware: (...middlewares_data) => {
        middlewares_data.forEach(middleware_data => middleware_data && this.#serverData.middlewares.push(toArray(middleware_data)) );
        return this
      },
      route:      (...routes_data)      => {
        routes_data.forEach(route_data => route_data && this.#serverData.routes.push(route_data) )
        return this
      },
      setting:    (...params)           => {
        const addSetting = (setting) => { setting.length && (this.#serverData.settings.push(setting)) }
        Array.isArray(params[0]) ? params.forEach(addSetting) : addSetting(params)
        return this
      },
      webSocket:  (WS)                  => {
        this.#plugin.webSocket = WS;
        return this
      },
    }
    this.run = (port=3000) => { Object.entries(www(this.#serverData, this.#plugin, port)).forEach( ([key,val]) => { this[key] = val }) }
  }

}

module.exports = EPS