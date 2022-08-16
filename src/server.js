import express from 'express'
import cors from 'express-cors'
import fileUpload from 'express-fileupload'
import { userRouter, depositRouter, withdrawRouter } from './routes/index.js'
import authorizationMiddleware from './middlewares/authorization.js'
import errorHandler from './middlewares/error-handler.js'

const maxFileSize = 50 * 1024 * 1024
const port = 3333

const server = express()
server.use(
  cors({
    allowedOrigins: ['localhost']
  })
)
server.use(express.json())
server.use(
  fileUpload({
    limits: {
      fileSize: maxFileSize
    }
  })
)

server.use('/', userRouter)

server.use(authorizationMiddleware)

server.use('/entradas', depositRouter)
server.use('/saidas', withdrawRouter)

server.use(errorHandler)

server.listen(port, () => {
  console.log(`\nServer started on port ${port}!`)
})
