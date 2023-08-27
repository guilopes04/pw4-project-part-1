import { DeleteStudentImpl } from '../../../data/use-cases/delete-student-impl'
import { DeleteStudent } from '../../../domain/use-cases/delete-student'
import { MockDeleteStudentRepository } from '../../../infra/db/repositories/students/mock-delete-student'
import { MockGetStudentsRepository } from '../../../infra/db/repositories/students/mock-get-students'

export const DbDeleteStudentFactory = (): DeleteStudent => {
  const deleteStudentCsv = new MockDeleteStudentRepository()
  const getStudentsCSV = new MockGetStudentsRepository()
  return new DeleteStudentImpl(getStudentsCSV, deleteStudentCsv)
}
