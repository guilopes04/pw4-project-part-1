import { GetClasses } from '../../../domain/use-cases/get-classes'
import { Controller } from '../../helpers/controller'
import { HttpRequest, HttpResponse } from '../../helpers/http'
import { CustomError, ServerError } from '../../helpers/http-helper'
import { httpResponse } from '../../helpers/http-response'

export class GetClassesController implements Controller {
  constructor(private readonly getClasses: GetClasses) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      console.log('• starting event with: ', httpRequest)
      const className = httpRequest?.queryParameters?.className

      const classes = this.getClasses.get(className)
      return httpResponse.success({ classes })
    } catch (error) {
      console.log('error: ', error)
      if (error instanceof CustomError) return error.toHttpResponse()
      return new ServerError().toHttpResponse()
    }
  }
}
