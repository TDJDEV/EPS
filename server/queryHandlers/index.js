const default_queryHandler = ['demo',(req, res, next, value)=>{console.log('demo => ',{value}),next()}]
function queryHandlers(handlers){
  handlers.forEach(queryHandler => {
    queryHandler=="demo"&&(queryHandler=default_queryHandler)
    this.param(...queryHandler),
    console.log('new param handler added => ', queryHandler)
  })
}
module.exports = queryHandlers