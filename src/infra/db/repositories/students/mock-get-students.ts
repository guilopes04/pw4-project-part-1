import { GetStudentsRepository } from '../../../../data/protocols/get-students-repository'
import { Student } from '../../../../domain/entities/student'
import fs from 'fs'

export class MockGetStudentsRepository implements GetStudentsRepository {
  constructor() {}

  get(id?: string, getDisciplines?: boolean): Student[] {
    let students: Student[] = getStudents(id)

    if (id) {
      const [student] = students
      if (!student) return []
      if (getDisciplines) {
        const studentDisciplines = getStudentDiscipline(id)
        student['disciplines'] = studentDisciplines
      }
      return [student]
    }

    return students
  }
}

const parseStudentFromCSV = (line: string): Student => {
  const [id, cpf, name, birthDate] = line.split(',')
  return {
    id,
    cpf,
    name,
    birthDate
  }
}

const getStudents = (id?: string) => {
  let students: Student[] = []
  const archive = fs.readFileSync(
    'src/infra/db/repositories/students/students.csv',
    'utf-8'
  )

  const lines = archive.split('\n')
  if (!lines) return []
  for (let line = 1; line < lines.length; line++) {
    const student: Student = parseStudentFromCSV(lines[line])
    if (id) {
      if (id === student.id) {
        students = [student]
        break
      }
    } else {
      students.push(student)
    }
  }

  return students
}

const getStudentDiscipline = (id: string): string[] => {
  let disciplines: string[] = []
  const archive = fs.readFileSync(
    'src/infra/db/repositories/disciplines/disciplines.csv',
    'utf-8'
  )

  const lines = archive.split('\n')
  if (!lines) return []
  for (let line = 1; line < lines.length; line++) {
    const discipline: { disciplineName: string; studentId: string } =
      parseDisciplineFromCSV(lines[line])
    if (id === discipline.studentId) {
      disciplines.push(discipline.disciplineName)
    }
  }

  return disciplines
}

const parseDisciplineFromCSV = (
  line: string
): { disciplineName: string; studentId: string } => {
  const [disciplineName, studentId] = line.split(',')
  return {
    disciplineName,
    studentId
  }
}
