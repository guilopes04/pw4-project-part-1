import { GetStudents } from '../../../domain/use-cases/get-students'
import { Controller } from '../../helpers/controller'
import { HttpRequest, HttpResponse } from '../../helpers/http'
import { CustomError, ServerError } from '../../helpers/http-helper'
import { httpResponse } from '../../helpers/http-response'

export class GetStudentsController implements Controller {
  constructor(private readonly getStudents: GetStudents) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      console.log('• starting event with: ', httpRequest)

      const studentId = httpRequest.pathParameters
        ? httpRequest.pathParameters.studentId
        : null
      const getDisciplines = httpRequest.queryParameters?.getDisciplines
        ? true
        : false

      const students = this.getStudents.get(studentId, getDisciplines)
      return httpResponse.success({ students })
    } catch (error) {
      console.log('error: ', error)
      if (error instanceof CustomError) return error.toHttpResponse()
      return new ServerError().toHttpResponse()
    }
  }
}
