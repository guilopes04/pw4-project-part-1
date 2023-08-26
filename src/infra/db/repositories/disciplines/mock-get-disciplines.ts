import { GetDisciplinesRepository } from '../../../../data/protocols/get-disciplines-repository'
import { disciplinesWithStudents } from '../../../../domain/entities/disciplines-with-students'
import fs from 'fs'

export class MockGetDisciplinesRepository implements GetDisciplinesRepository {
  constructor() {}

  get(disciplineName: string): disciplinesWithStudents[] {
    const disciplinesWithStudents: disciplinesWithStudents[] = []

    const archive = fs.readFileSync(
      'src/infra/db/repositories/disciplines/disciplines.csv',
      'utf-8'
    )

    const lines = archive.split('\n')
    if (!lines) return []
    for (let line = 1; line < lines.length; line++) {
      disciplinesWithStudents.push(parseDisciplineFromCSV(lines[line]))
    }

    return disciplinesWithStudents.filter(
      (discipline) => discipline.disciplineName === disciplineName
    )
  }
}

const parseDisciplineFromCSV = (line: string): disciplinesWithStudents => {
  const [disciplineName, studentId] = line.split(',')
  return {
    disciplineName,
    studentId
  }
}
