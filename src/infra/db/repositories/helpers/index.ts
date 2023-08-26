import fs from 'fs'
import csvParser from 'csv-parser'
import { CsvTitles } from '../../../../domain/entities/csv-titles'

export const getCsv = (csvType: string): string => {
  const entityPath = getCsvType(csvType)
  const archive = fs.readFileSync(entityPath, 'utf-8')

  return archive
}

const getCsvType = (csvType: string): string => {
  let entityPath = 'src/infra/db/repositories/'
  if (csvType === 'student') {
    entityPath += 'students/students.csv'
  } else if (csvType === 'class') {
    entityPath += 'classes/classes.csv'
  } else if (csvType === 'discipline') {
    entityPath += 'disciplines/disciplines.csv'
  }

  return entityPath
}

export const postCsv = (newString: string, csvType: string): void => {
  const entityPath = getCsvType(csvType)
  fs.writeFileSync(entityPath, newString)
}

export const deleteEntityCsv = (
  csvType: string,
  id: string,
  csvTitle: CsvTitles
): void => {
  let rows = []
  const csvFilePath = getCsvType(csvType)
  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', (row) => {
      rows.push(row)
    })
    .on('end', () => {
      const filteredRows = rows.filter((row) => row.studentId !== id)

      const newCsvContent = filteredRows
        .map((row) => Object.values(row).join(','))
        .join('\n')

      fs.writeFileSync(
        csvFilePath,
        `${csvTitle}` + `\n` + newCsvContent,
        'utf-8'
      )
    })
}
