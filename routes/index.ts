import express, { Request, Response } from 'express'
import { adapterEvent } from '../src/infra/adapters/adpter-event'
import { makeGetStudentsController } from '../src/main/factories/controllers/get-students-factory'
import { makeGetClassesController } from '../src/main/factories/controllers/get-classes-factory'
import { makeGetDisciplinesController } from '../src/main/factories/controllers/get-disciplines-factory'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Projeto Express</title>
    </head>
    <body>
      <h1>Bem-vindo ao meu projeto Express!</h1>
    </body>
    </html>
  `)
})

router.get('/students', (req: Request, res: Response) => {
  const response = adapterEvent(req, makeGetStudentsController())
  res.status(response.statusCode).send(response.body)
})

router.get('/class', (req: Request, res: Response) => {
  const response = adapterEvent(req, makeGetClassesController())
  res.status(response.statusCode).send(response.body)
})

router.get('/disciplines', (req: Request, res: Response) => {
  const response = adapterEvent(req, makeGetDisciplinesController())
  res.status(response.statusCode).send(response.body)
})

export default router
