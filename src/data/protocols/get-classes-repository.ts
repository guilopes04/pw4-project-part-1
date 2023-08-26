import { ClassDTO } from '../../domain/entities/classDTO'

export interface GetClassesRepository {
  get: () => ClassDTO[]
}
