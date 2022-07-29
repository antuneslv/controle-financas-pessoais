import mongoose from 'mongoose'
import moment from 'moment'

const TokenModel = mongoose.model('Token', {
  createdAt: Date,
  active: Boolean,
  userId: String
})

export const createToken = async userId => {
  const token = new TokenModel()

  token.createdAt = new Date()
  token.active = true
  token.userId = userId

  await token.save()

  return token
}

export const getValidToken = async tokenId => {
  const token = await TokenModel.findById(tokenId)

  const expireAt = moment(token.createdAt)
  expireAt.add(1, 'd')

  if (!token || !token.active || expireAt < moment())
    throw new Error('Invalid token')

  return token
}
