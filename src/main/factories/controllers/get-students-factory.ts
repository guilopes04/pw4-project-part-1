import { GetStudentsController } from '../../../presentation/controllers/students/get-students-controller'
import { Controller } from '../../../presentation/helpers/controller'
import { DbGetStudentsFactory } from '../use-cases/db-get-students-factory'

export const makeGetStudentsController = (): Controller => {
  return new GetStudentsController(DbGetStudentsFactory())
}
