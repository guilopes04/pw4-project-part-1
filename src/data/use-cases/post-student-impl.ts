import { randomUUID } from 'crypto'
import { PostStudentDTO } from '../../domain/entities/postStudentDTO'
import { PostStudent } from '../../domain/use-cases/post-student'
import { PostStudentRepository } from '../protocols/post-student-repository'
import { DeleteStudentRepository } from '../protocols/delete-student-repository'

export class PostStudentImpl implements PostStudent {
  constructor(
    private readonly postStudentRepository: PostStudentRepository,
    private readonly deleteStudentRepository: DeleteStudentRepository
  ) {}

  post(student: PostStudentDTO): void {
    if (!student?.studentId) {
      student['studentId'] = randomUUID()
    } else {
      this.deleteStudentRepository.delete(student.studentId)
    }
    this.postStudentRepository.post(student)
  }
}
