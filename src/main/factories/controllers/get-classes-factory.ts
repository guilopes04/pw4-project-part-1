import { GetClassesController } from '../../../presentation/controllers/classes/get-classes-controller'
import { Controller } from '../../../presentation/helpers/controller'
import { DbGetClassesFactory } from '../use-cases/db-get-classes-factory'

export const makeGetClassesController = (): Controller => {
  return new GetClassesController(DbGetClassesFactory())
}
