import { Student } from '../entities/student'

export interface GetStudentDisciplines {
  get: (id: string) => Student[]
}
