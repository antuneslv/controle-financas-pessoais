import mongoose from 'mongoose'
import DBError from '../errors/dberror.js'

const UserModel = mongoose.model('User', {
  name: String,
  email: String,
  passwordHash: String
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

  await newUser.save()

  return newUser
}

export const getUserByEmail = async ({ email }) => {
  const user = await UserModel.findOne({ email })

  return user
}
