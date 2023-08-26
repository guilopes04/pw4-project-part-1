import { PostStudentRepository } from '../../../../data/protocols/post-student-repository'
import { PostStudentDTO } from '../../../../domain/entities/postStudentDTO'
import { getCsv, postCsv } from '../helpers'

export class MockPostStudentRepository implements PostStudentRepository {
  constructor() {}

  post(student: PostStudentDTO): void {
    let studentsCsv = getCsv('student')
    studentsCsv += `\n${student.studentId},${student.cpf},${student.name},${student.birthDate}`
    postCsv(studentsCsv, 'student')
    if (student.className) {
      let classCsv = getCsv('class')
      classCsv += `\n${student.studentId},${student.className}`
      postCsv(classCsv, 'class')
    }
    if (student.disciplines) {
      let disciplinesCsv = getCsv('discipline')
      for (const discipline of student.disciplines) {
        disciplinesCsv += `\n${student.studentId},${discipline}`
      }
      postCsv(disciplinesCsv, 'discipline')
    }
  }
}
