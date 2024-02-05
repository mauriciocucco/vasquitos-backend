const notFoundMiddleware = (req, res, next) => {
  const error = new Error('Route not found.')

  error.status = 404

  next(error)
}

const generalErrors = (err, req, res, next) => {
  console.log('generalErrors error: ', err)

  if (err.validationErrors) {
    return res.status(err.status).json({ errors: err.validationErrors })
  }

  return res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal server error.' })
}

export const errorsMiddlewares = (app) => {
  app.use(notFoundMiddleware, generalErrors)
}
