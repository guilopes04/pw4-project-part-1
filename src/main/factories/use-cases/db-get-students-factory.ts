import { GetStudentsImpl } from '../../../data/use-cases/get-students-impl'
import { GetStudents } from '../../../domain/use-cases/get-students'
import { MockGetStudentsRepository } from '../../../infra/db/repositories/students/mock-get-students'

export const DbGetStudentsFactory = (): GetStudents => {
  const getStudentsMock = new MockGetStudentsRepository()
  return new GetStudentsImpl(getStudentsMock)
}
