import { GetClassesRepository } from '../../../../data/protocols/get-classes-repository'
import fs from 'fs'

export class MockGetClassesRepository implements GetClassesRepository {
  constructor() {}

  get(): { className: string; studentId: string }[] {
    const classes: { className: string; studentId: string }[] = []

    const archive = fs.readFileSync(
      'src/infra/db/repositories/classes/classes.csv',
      'utf-8'
    )

    const lines = archive.split('\n')
    if (!lines) return []
    for (let line = 1; line < lines.length; line++) {
      classes.push(parseClassFromCSV(lines[line]))
    }

    return classes
  }
}

const parseClassFromCSV = (
  line: string
): { className: string; studentId: string } => {
  const [studentId, className] = line.split(',')
  return {
    className,
    studentId
  }
}
