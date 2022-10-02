function middlewares(middlewares){middlewares.reduce(
    (app, middleware_data)=>{
        console.log('new middleware added =>',middleware_data)
        return app.use(...middleware_data)
    },
    this
)}
module.exports = middlewares