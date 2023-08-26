import { Student } from '../entities/student'

export interface GetStudents {
  get: (id?: string, getDisciplines?: boolean) => Student[]
}
