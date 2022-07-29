import { Router } from 'express'
import {
  createNewWithdraw,
  getWithdraw,
  getAllWithdraws,
  updateWithdraw,
  deleteWithdraw
} from '../models/withdraw.js'
import WithdrawDTO from '../views/withdraw-dto.js'

const withdrawRouter = new Router()

withdrawRouter.get('/:id?', async (request, response) => {
  const { id } = request.params

  if (id) {
    const withdraw = await getWithdraw(id)
    if (!withdraw) {
      response.status(200).send()
      return
    }

    const dto = new WithdrawDTO(withdraw)

    response.status(200).json(dto.toJson())

    return
  }

  const allWithdraws = await getAllWithdraws()

  const listOfDTOs = allWithdraws.map(withdraw => {
    const dto = new WithdrawDTO(withdraw)
    return dto.toJson()
  })

  response.status(200).json(listOfDTOs)
})

withdrawRouter.post('/', async (request, response) => {
  const { description, value } = request.body

  if (!description || !value) {
    response.send(400).send('Missing data')
    return
  }

  const newWithdraw = await createNewWithdraw(description, value)

  response.status(201).json(newWithdraw)
})

withdrawRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { description, value } = request.body

  const withdraw = await updateWithdraw(id, description, value)

  response.status(200).json(withdraw)
})

withdrawRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  await deleteWithdraw(id)

  response.status(204).send()
})

export default withdrawRouter
