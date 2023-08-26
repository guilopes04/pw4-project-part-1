import { PostStudentDTO } from '../../domain/entities/postStudentDTO'

export type MethodType = 'POST' | 'UPDATE'

export interface PostStudentRepository {
  post: (student: PostStudentDTO) => void
}
