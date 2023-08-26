import { DeleteStudentRepository } from '../../../../data/protocols/delete-student-repository'
import { CsvTitles } from '../../../../domain/entities/csv-titles'
import { deleteEntityCsv, getCsv } from '../helpers'

export class MockDeleteStudentRepository implements DeleteStudentRepository {
  constructor() {}

  delete(id: string): void {
    deleteEntityCsv('student', id, CsvTitles.student)

    deleteEntityCsv('class', id, CsvTitles.class)

    deleteEntityCsv('discipline', id, CsvTitles.discipline)
  }
}
