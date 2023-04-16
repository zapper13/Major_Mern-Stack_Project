/**
 * This is a module that exports two middleware functions for handling 404 errors and general errors in
 * a Node.js/Express application.
 * @param req - short for request, it represents the HTTP request object that contains information
 * about the incoming request such as the URL, headers, and parameters.
 * @param res - `res` stands for response and is an object that represents the HTTP response that an
 * Express app sends when it receives an HTTP request. It contains methods for setting the HTTP status
 * code, headers, and sending the response body.
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the chain. It is typically used to handle errors or to move on to the next middleware function in
 * the stack.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { notFound, errorHandler }
