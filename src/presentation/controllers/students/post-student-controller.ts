import { PostStudentDTO } from '../../../domain/entities/postStudentDTO'
import { PostStudent } from '../../../domain/use-cases/post-student'
import { Controller } from '../../helpers/controller'
import { HttpRequest, HttpResponse } from '../../helpers/http'
import { CustomError, ServerError } from '../../helpers/http-helper'
import { httpResponse } from '../../helpers/http-response'

export class PostStudentController implements Controller {
  constructor(private readonly postStudent: PostStudent) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      console.log('• starting event with: ', httpRequest)

      const { student } = httpRequest?.body

      this.postStudent.post(student)
      return httpResponse.noContent()
    } catch (error) {
      console.log('error: ', error)
      if (error instanceof CustomError) return error.toHttpResponse()
      return new ServerError().toHttpResponse()
    }
  }
}
