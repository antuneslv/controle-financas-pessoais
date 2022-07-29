import { Router } from 'express'
import {
  createNewDeposit,
  getDeposit,
  getAllDeposits,
  updateDeposit,
  deleteDeposit
} from '../models/deposit.js'
import DepositDTO from '../views/deposit-dto.js'

const depositRouter = new Router()

depositRouter.get('/:id?', async (request, response) => {
  const { id } = request.params

  if (id) {
    const deposit = await getDeposit(id)
    if (!deposit) {
      response.status(200).send()
      return
    }

    const dto = new DepositDTO(deposit)

    response.status(200).json(dto.toJson())

    return
  }

  const allDeposits = await getAllDeposits()
  
  const listOfDTOs = allDeposits.map(deposit => {
    const dto = new DepositDTO(deposit)
    return dto.toJson()
  })

  response.status(200).json(listOfDTOs)
})

depositRouter.post('/', async (request, response) => {
  const { description, value } = request.body

  if (!description || !value) {
    response.send(400).send('Missing data')
    return
  }

  const newDeposit = await createNewDeposit(description, value)

  response.status(201).json(newDeposit)
})

depositRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { description, value } = request.body

  const deposit = await updateDeposit(id, description, value)

  response.status(200).json(deposit)
})

depositRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  await deleteDeposit(id)

  response.status(204).send()
})

export default depositRouter
