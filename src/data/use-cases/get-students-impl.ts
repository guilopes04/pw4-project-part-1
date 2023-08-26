import { Student } from '../../domain/entities/student'
import { GetStudents } from '../../domain/use-cases/get-students'
import { GetStudentsRepository } from '../protocols/get-students-repository'

export class GetStudentsImpl implements GetStudents {
  constructor(private readonly getStudentsRepository: GetStudentsRepository) {}

  get(id?: string, getDisciplines?: boolean): Student[] {
    return this.getStudentsRepository.get(id, getDisciplines)
  }
}
