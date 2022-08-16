import { Router } from 'express'
import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import { createToken } from '../models/token.js'
import {
  createNewUser,
  getUserByEmail,
  getUserById,
  saveUserAvatar
} from '../models/user.js'
import UserDTO from '../views/user-dto.js'
import TokenDTO from '../views/token-dto.js'

const userRouter = new Router()

userRouter.post('/signup', async (request, response) => {
  const { name, email, password } = request.body


  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  const newUser = await createNewUser({ name, email, passwordHash })

  response.status(201).json(new UserDTO(newUser))
})

userRouter.post('/login', async (request, response) => {
  const { email, password } = request.body

  const user = await getUserByEmail({ email })
  const checkPassword = await bcrypt.compare(password, user.passwordHash)

  if (!user || !checkPassword) {
    response.status(403).send('Unauthorized')
    return
  }

  const token = await createToken(user._id)

  response.status(201).send(new TokenDTO(token))
})

userRouter.post('/:id/avatar', async (request, response) => {
  const { id } = request.params

  if (!request.files) {
    response.status(400).send('no file')
    return
  }

  const user = await getUserById(id)

  let path = ''
  if (user.avatarPath) {
    path = user.avatarPath
  } else {
    const fileId = uuidV4()
    path = `./images/${fileId}`
  }

  request.files.avatar.mv(path, err => {
    if (err) {
      console.error(err)
      response.status(500).send('error')
      return
    }

    saveUserAvatar(id, path)
    response.status(201).send('image saved')
  })
})

export default userRouter
