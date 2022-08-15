import mongoose from 'mongoose'

const DepositModel = mongoose.model('Deposit', {
  description: String,
  value: Number,
  createdAt: Date
})

export const createNewDeposit = async ( description, value ) => {
  const newDeposit = new DepositModel()

  newDeposit.description = description
  newDeposit.value = value
  newDeposit.createdAt = new Date()

  await newDeposit.save()

  return newDeposit
}

export const getDeposit = async id => {
  return await DepositModel.findById(id)
}

export const getAllDeposits = async () => {
  return await DepositModel.find()
}

export const updateDeposit = async (id, description, value) => {
  const deposit = await DepositModel.findById(id)

  deposit.description = description
  deposit.value = value

  await deposit.save()

  return deposit
}

export const deleteDeposit = async id => {
  await DepositModel.findByIdAndDelete(id)
}
