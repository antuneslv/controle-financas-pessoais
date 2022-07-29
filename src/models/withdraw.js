import mongoose from 'mongoose'

const WithdrawModel = mongoose.model('Withdraw', {
  description: String,
  value: Number
})

export const createNewWithdraw = async (description, value) => {
  const newWithdraw = new WithdrawModel()

  newWithdraw.description = description
  newWithdraw.value = value

  await newWithdraw.save()

  return newWithdraw
}

export const getWithdraw = async id => {
  return await WithdrawModel.findById(id)
}

export const getAllWithdraws = async () => {
  return await WithdrawModel.find()
}

export const updateWithdraw = async (id, description, value) => {
  const withdraw = await WithdrawModel.findById(id)

  withdraw.description = description
  withdraw.value = value

  await withdraw.save()

  return withdraw
}

export const deleteWithdraw = async id => {
  await WithdrawModel.findByIdAndDelete(id)
}
