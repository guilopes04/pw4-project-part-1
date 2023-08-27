import { Discipline } from '../../domain/entities/discipline'
import { GetDisciplines } from '../../domain/use-cases/get-disciplines'
import { MissingParamError } from '../../presentation/helpers/http-helper'
import { GetDisciplinesRepository } from '../protocols/get-disciplines-repository'
import { GetStudentsRepository } from '../protocols/get-students-repository'

export class GetDisciplinesImpl implements GetDisciplines {
  constructor(
    private readonly getDisciplinesRepository: GetDisciplinesRepository,
    private readonly getStudentsRepository: GetStudentsRepository
  ) {}

  get(disciplineName: string): Discipline {
    if (!disciplineName) throw new MissingParamError('disciplineName')

    const disciplinesWithStudents =
      this.getDisciplinesRepository.get(disciplineName)

    const discipline: Discipline = {
      name: disciplineName,
      students: []
    }
    for (const { studentId } of disciplinesWithStudents) {
      const [student] = this.getStudentsRepository.get(studentId)

      discipline.students.push(student)
    }

    return discipline
  }
}
