//Express error middleware

const reduceError = require('../errors/reducer')

module.exports = (err, req, res, next) => {
  const errorDetails = reduceError(err)

  if (errorDetails.logError) {
    console.error('Error:', err)
  }

  res.status(errorDetails.status).json({
    success: false,
    message: errorDetails.message
  })
}
