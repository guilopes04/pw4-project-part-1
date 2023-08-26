import { Class } from '../entities/class'

export interface GetClasses {
  get: (className?: string) => Class[]
}
