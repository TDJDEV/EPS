import createError from 'http-errors';

function errorHandler(errorHandler) {

  return [
    function(req, res, next) {
      next(createError(404));
    },
    errorHandler
  ]
}

export { errorHandler}