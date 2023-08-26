import { PostStudentImpl } from '../../../data/use-cases/post-student-impl'
import { PostStudent } from '../../../domain/use-cases/post-student'
import { MockDeleteStudentRepository } from '../../../infra/db/repositories/students/mock-delete-student'
import { MockPostStudentRepository } from '../../../infra/db/repositories/students/mock-post-student'

export const DbPostStudentFactory = (): PostStudent => {
  const postStudentMock = new MockPostStudentRepository()
  const deleteStudentMock = new MockDeleteStudentRepository()
  return new PostStudentImpl(postStudentMock, deleteStudentMock)
}
