function errorHandler(errorHandler) {

  this.use(
    function(req, res, next) {next(require('http-errors')(404));},
    errorHandler.bind(this)
  )
}

module.exports = errorHandler