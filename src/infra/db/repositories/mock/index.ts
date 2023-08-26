import { randomInt, randomUUID } from 'crypto'
import { disciplinesWithStudents } from '../../../../domain/entities/disciplines-with-students'
import { Student } from '../../../../domain/entities/student'
import fs from 'fs'

export const generateDisciplinesWithStudents =
  (): disciplinesWithStudents[] => {
    const disciplines: string[] = [
      'Programação I',
      'Banco de Dados',
      'Engenharia de Software',
      'Redes de Computadores',
      'Sistemas Operacionais',
      'Web Development',
      'Inteligência Artificial',
      'Projeto Integrador'
    ]

    const disciplinesWithStudents: disciplinesWithStudents[] = []

    const students: Student[] = []

    const archive = fs.readFileSync(
      'src/infra/db/repositories/students/students.csv',
      'utf-8'
    )

    const lines = archive.split('\n')
    if (!lines) return []
    for (let line = 1; line < lines.length; line++) {
      students.push(parseStudentFromCSV(lines[line]))
    }

    students.forEach((student) => {
      const numberOfDisciplines = randomInt(9)
      for (let i = 0; i < numberOfDisciplines; i++) {
        disciplinesWithStudents.push({
          disciplineName: disciplines[i],
          studentId: student.studentId
        })
      }
    })

    const csvContent = `studentId,disciplineName\n${disciplinesWithStudents
      .map(
        (disciplinesWithStudents) =>
          `${disciplinesWithStudents.studentId},${disciplinesWithStudents.disciplineName}`
      )
      .join('\n')}`

    fs.writeFileSync(
      'src/infra/db/repositories/disciplines/disciplines.csv',
      csvContent
    )
    console.log('Arquivo CSV disciplines gerado com sucesso.')

    return disciplinesWithStudents
  }

export const generateStudents = (qtd: number): Student[] => {
  const alunos: Student[] = []
  for (let i = 0; i < qtd; i++) {
    alunos.push({
      studentId: randomUUID(),
      name: `Aluno ${i + 1}`,
      cpf: `CPF${i + 1}`,
      birthDate: '01/01/1990'
    })
  }

  const csvContent = `studentId,cpf,name,birthDate\n${alunos
    .map(
      (student) =>
        `${student.studentId},${student.cpf},${student.name},${student.birthDate}`
    )
    .join('\n')}`

  fs.writeFileSync(
    'src/infra/db/repositories/students/students.csv',
    csvContent
  )
  console.log('Arquivo CSV students gerado com sucesso.')
  return alunos
}

export const generateClasses = () => {
  const classes: { className: string; studentId: string }[] = []

  const yearsClass = [
    '2018-1',
    '2018-2',
    '2019-1',
    '2019-2',
    '2020-1',
    '2020-2',
    '2021-1',
    '2021-2',
    '2022-1',
    '2022-2',
    '2023-1',
    '2023-2'
  ]

  const students: Student[] = []

  const archive = fs.readFileSync(
    'src/infra/db/repositories/students/students.csv',
    'utf-8'
  )

  const lines = archive.split('\n')
  if (!lines) return []
  for (let line = 1; line < lines.length; line++) {
    students.push(parseStudentFromCSV(lines[line]))
  }
  let studentStopped = 40
  let studentStart = 0
  yearsClass.forEach((year) => {
    for (let student = studentStart; student !== studentStopped; student++) {
      classes.push({
        className: year,
        studentId: students[student].studentId
      })
    }
    studentStart = studentStopped
    studentStopped = studentStopped + 40
  })

  const csvContent = `studentId,className\n${classes
    .map((classObj) => `${classObj.studentId},${classObj.className}`)
    .join('\n')}`

  fs.writeFileSync('src/infra/db/repositories/classes/classes.csv', csvContent)
  console.log('Arquivo CSV classes gerado com sucesso.')

  return classes
}

const parseStudentFromCSV = (line: string): Student => {
  const [studentId, cpf, name, birthDate] = line.split(',')
  return {
    studentId,
    cpf,
    name,
    birthDate
  }
}
