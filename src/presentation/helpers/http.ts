export type HttpRequest = {
  body: any
  pathParameters?: any
  queryParameters?: any
}

export type HttpResponse = {
  statusCode: number
  body?: any
}
