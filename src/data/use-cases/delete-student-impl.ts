import { PostStudentDTO } from '../../domain/entities/postStudentDTO'
import { DeleteStudent } from '../../domain/use-cases/delete-student'
import {
  MissingParamError,
  StudentDoesNotExistError
} from '../../presentation/helpers/http-helper'
import { DeleteStudentRepository } from '../protocols/delete-student-repository'
import { GetStudentsRepository } from '../protocols/get-students-repository'

export class DeleteStudentImpl implements DeleteStudent {
  constructor(
    private readonly getStudentsRepository: GetStudentsRepository,
    private readonly deleteStudentRepository: DeleteStudentRepository
  ) {}

  delete(studentId: string): void {
    if (!studentId) throw new MissingParamError('studentId')

    const [student] = this.getStudentsRepository.get(studentId)

    if (!student) throw new StudentDoesNotExistError(studentId)

    this.deleteStudentRepository.delete(student.studentId)
  }
}
