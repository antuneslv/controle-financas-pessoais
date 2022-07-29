import { Router } from 'express'
import { createToken } from '../models/token.js'
import { createNewUser, getUserByEmail } from '../models/user.js'
import UserDTO from '../views/user-dto.js'
import TokenDTO from '../views/token-dto.js'

const userRouter = new Router()

userRouter.post('/signup', async (request, response) => {
  const { name, email, password } = request.body

  const newUser = await createNewUser({ name, email, password })

  response.status(201).json(new UserDTO(newUser))
})

userRouter.post('/login', async (request, response) => {
  const { email, password } = request.body

  const user = await getUserByEmail({ email })
  if (!user || user.password !== password) {
    response.status(403).send('Unauthorized')
    return
  }

  const token = await createToken(user._id)

  response.status(201).send(new TokenDTO(token))
})

export default userRouter
