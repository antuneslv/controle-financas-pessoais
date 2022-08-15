import express from 'express'
import cors from 'express-cors'
import { userRouter, depositRouter, withdrawRouter } from './routes/index.js'
import authorizationMiddleware from './middlewares/authorization.js'
import errorHandler from './middlewares/error-handler.js'


const server = express()
server.use(
  cors({
    allowedOrigins: ['localhost']
  })
)
server.use(express.json())
const PORT = 3333

server.use('/', userRouter)

// server.use(authorizationMiddleware)

server.use('/entradas', depositRouter)
server.use('/saidas', withdrawRouter)

server.use(errorHandler)

server.listen(PORT, () => {
  console.log(`\nServer started on port ${PORT}!`)
})
