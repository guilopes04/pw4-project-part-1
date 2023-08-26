import { disciplinesWithStudents } from '../../domain/entities/disciplines-with-students'

export interface GetDisciplinesRepository {
  get: (disciplineName: string) => disciplinesWithStudents[]
}
