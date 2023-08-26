import { MissingParamError } from './http-helper'

export const validateFields = (entity: any, requiredFields: string[]) => {
  requiredFields.forEach(field => {
    if (entity[field] == undefined) throw new MissingParamError(field)
  })

  return entity
}
