import { Discipline } from '../entities/discipline'

export interface GetDisciplines {
  get: (disciplineName: string) => Discipline
}
