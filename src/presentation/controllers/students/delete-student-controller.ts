import { DeleteStudent } from '../../../domain/use-cases/delete-student'
import { Controller } from '../../helpers/controller'
import { HttpRequest, HttpResponse } from '../../helpers/http'
import { CustomError, ServerError } from '../../helpers/http-helper'
import { httpResponse } from '../../helpers/http-response'

export class DeleteStudentController implements Controller {
  constructor(private readonly deleteStudent: DeleteStudent) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      console.log('• starting event with: ', httpRequest)

      const studentId = httpRequest.pathParameters
        ? httpRequest.pathParameters?.studentId
        : null

      this.deleteStudent.delete(studentId)
      return httpResponse.noContent()
    } catch (error) {
      console.log('error: ', error)
      if (error instanceof CustomError) return error.toHttpResponse()
      return new ServerError().toHttpResponse()
    }
  }
}
