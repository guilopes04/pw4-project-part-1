import { GetClassesImpl } from '../../../data/use-cases/get-classes-impl'
import { GetClasses } from '../../../domain/use-cases/get-classes'
import { MockGetClassesRepository } from '../../../infra/db/repositories/classes/mock-get-classes'
import { MockGetStudentsRepository } from '../../../infra/db/repositories/students/mock-get-students'

export const DbGetClassesFactory = (): GetClasses => {
  const getClassesMock = new MockGetClassesRepository()
  const getStudentsCSV = new MockGetStudentsRepository()
  return new GetClassesImpl(getClassesMock, getStudentsCSV)
}
