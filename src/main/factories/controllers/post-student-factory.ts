import { PostStudentController } from '../../../presentation/controllers/students/post-student-controller'
import { Controller } from '../../../presentation/helpers/controller'
import { DbPostStudentFactory } from '../use-cases/db-post-student-factory'

export const makePostStudentController = (): Controller => {
  return new PostStudentController(DbPostStudentFactory())
}
