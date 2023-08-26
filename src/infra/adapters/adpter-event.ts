import { Request } from 'express'
import { HttpRequest, HttpResponse } from '../../presentation/helpers/http'
import { Controller } from '../../presentation/helpers/controller'

export const adapterEvent = (req: Request, controller: Controller) => {
  const httpRequest: HttpRequest = {
    body: (req.body && JSON.parse(req.body)) || {},
    pathParameters: req.params || {},
    queryParameters: req.query || {}
  }
  const httpResponse = controller.handle(httpRequest)
  return httpResponse as HttpResponse
}
