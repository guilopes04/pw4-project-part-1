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
      console.log('deletando')
      this.deleteStudentRepository.delete(student.studentId)
      console.log('deletado')
    }

    setTimeout(() => {
      console.log('adicionando')
      this.postStudentRepository.post(student)
      console.log('adicionado')
    }, 200)
  }
}
