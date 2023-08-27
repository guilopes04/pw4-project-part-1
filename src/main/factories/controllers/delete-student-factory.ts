import { DeleteStudentController } from '../../../presentation/controllers/students/delete-student-controller'
import { Controller } from '../../../presentation/helpers/controller'
import { DbDeleteStudentFactory } from '../use-cases/db-delete-student-factory'

export const makeDeleteStudentController = (): Controller => {
  return new DeleteStudentController(DbDeleteStudentFactory())
}
