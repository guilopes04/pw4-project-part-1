import cors from 'cors'
import router from './routes'
import express from 'express'
import {
  generateClasses,
  generateDisciplinesWithStudents,
  generateStudents
} from './src/infra/db/repositories/mock/index'

const app = express()
const port = 3000

app.use(cors(), express.json())

app.use('/', router)

generateStudents(480)
generateClasses()
generateDisciplinesWithStudents()

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
