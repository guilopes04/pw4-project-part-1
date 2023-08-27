import { GetDisciplinesImpl } from '../../../data/use-cases/get-disciplines-impl'
import { GetDisciplines } from '../../../domain/use-cases/get-disciplines'
import { MockGetDisciplinesRepository } from '../../../infra/db/repositories/disciplines/mock-get-disciplines'
import { MockGetStudentsRepository } from '../../../infra/db/repositories/students/mock-get-students'

export const DbGetDisciplinesFactory = (): GetDisciplines => {
  const getDisciplinesCSV = new MockGetDisciplinesRepository()
  const getStudentsCSV = new MockGetStudentsRepository()
  return new GetDisciplinesImpl(getDisciplinesCSV, getStudentsCSV)
}
