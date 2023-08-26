import { HttpResponse } from './http'

export const httpResponse = {
  success(data: any): HttpResponse {
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  },

  noContent(): HttpResponse {
    return {
      statusCode: 204,
      body: null
    }
  },

  created(resource: any): HttpResponse {
    return {
      statusCode: 201,
      body: JSON.stringify(resource)
    }
  }
}
