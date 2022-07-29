import DBError from '../errors/dberror.js'

const errorHandler = (error, req, res, next) => {
  if (error instanceof DBError) {
    res.status(400).send('Bad request')
  } else if (error) {
    next(error)
  } else {
    next()
  }
}

export default errorHandler
