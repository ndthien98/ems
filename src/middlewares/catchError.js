const catchError = f => async (req, res, next) => {
  try {
    await f(req, res, next);
  } catch (error) {
    console.log(error);
    next(error)
  } finally {
    
  }
}
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  console.log(error)
  if (error.status > 399 || error.status < 500) {
    res.status(error.status).send({
      status: false,
      message: error.message,
    })
  } else {
    res.status(500).send({
      status: false,
      message: 'Something happened!',
      error
    })
  }
};

module.exports = {
  catchError,
  errorHandler
};

