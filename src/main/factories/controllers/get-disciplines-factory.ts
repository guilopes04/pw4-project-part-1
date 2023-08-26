import { GetDisciplinesController } from '../../../presentation/controllers/disciplines/get-disciplines-controller'
import { Controller } from '../../../presentation/helpers/controller'
import { DbGetDisciplinesFactory } from '../use-cases/db-get-disciplines-factory'

export const makeGetDisciplinesController = (): Controller => {
  return new GetDisciplinesController(DbGetDisciplinesFactory())
}
