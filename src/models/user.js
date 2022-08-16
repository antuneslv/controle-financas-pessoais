import mongoose from 'mongoose'
import DBError from '../errors/dberror.js'

const UserModel = mongoose.model('User', {
  name: String,
  email: String,
  passwordHash: String,
  avatarPath: String,
  createdAt: Date
})

export const createNewUser = async ({ name, email, passwordHash }) => {
  const user = await getUserByEmail({ email })

  if (user) {
    throw new DBError('User already exists')
  }

  const newUser = new UserModel()

  newUser.name = name
  newUser.email = email
  newUser.passwordHash = passwordHash
  newUser.createdAt = new Date()

  await newUser.save()

  return newUser
}

export const getUserByEmail = async ({ email }) => {
  const user = await UserModel.findOne({ email })

  return user
}

export const getUserById = async (id) => {
  const user = await UserModel.findById(id)

  return user
}

export const saveUserAvatar= async (id, path) => {
  const user = await UserModel.findById(id)

  user.avatarPath = path

  return await user.save()
}
