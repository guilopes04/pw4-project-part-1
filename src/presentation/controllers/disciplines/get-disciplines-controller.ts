import { GetDisciplines } from '../../../domain/use-cases/get-disciplines'
import { Controller } from '../../helpers/controller'
import { HttpRequest, HttpResponse } from '../../helpers/http'
import {
  CustomError,
  MissingParamError,
  ServerError
} from '../../helpers/http-helper'
import { httpResponse } from '../../helpers/http-response'

export class GetDisciplinesController implements Controller {
  constructor(private readonly getDisciplines: GetDisciplines) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      console.log('• starting event with: ', httpRequest)
      const disciplineName = httpRequest?.queryParameters?.disciplineName
      if (!disciplineName)
        return new MissingParamError('disciplineName').toHttpResponse()

      const discipline = this.getDisciplines.get(disciplineName)
      return httpResponse.success({ discipline })
    } catch (error) {
      console.log('error: ', error)
      if (error instanceof CustomError) return error.toHttpResponse()
      return new ServerError().toHttpResponse()
    }
  }
}
