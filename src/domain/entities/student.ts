import { Discipline } from './discipline'

export type Student = {
  id: string
  name: string
  cpf: string
  birthDate: string
  disciplines?: string[]
}
