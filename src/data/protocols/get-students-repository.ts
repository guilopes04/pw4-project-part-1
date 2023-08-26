import { Student } from '../../domain/entities/student'

export interface GetStudentsRepository {
  get: (id?: string, getDisciplines?: boolean) => Student[]
}
