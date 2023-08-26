import { PostStudentDTO } from '../entities/postStudentDTO'

export interface PostStudent {
  post: (student: PostStudentDTO) => void
}
