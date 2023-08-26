import { GetClassesController } from '../../../src/presentation/controllers/classes/get-classes-controller'
import {
  CustomError,
  ServerError
} from '../../../src/presentation/helpers/http-helper'

// Mocks
const mockGetClasses = {
  get: jest.fn()
}

const mockHttpRequest = {
  queryParameters: {
    className: 'Math'
  }
}

describe('GetClassesController', () => {
  let getClassesController

  beforeEach(() => {
    getClassesController = new GetClassesController(mockGetClasses)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return classes when successful', () => {
    // Mock the return value of the GetClasses use case
    const mockClasses = [
      {
        name: 'Math',
        students: [
          {
            id: 'student-id',
            name: 'John Doe'
          }
        ]
      }
    ]
    mockGetClasses.get.mockReturnValue(mockClasses)

    // Call the controller's handle method
    const response = getClassesController.handle(mockHttpRequest)

    // Assertions
    expect(mockGetClasses.get).toHaveBeenCalledWith('Math')
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body).classes).toEqual(mockClasses)
  })

  it('should handle CustomError and return its response', () => {
    const mockCustomError = new CustomError({
      displayMessage: 'custom error',
      displayTitle: 'Custom Error',
      errorCode: '400'
    })
    mockGetClasses.get.mockImplementation(() => {
      throw mockCustomError
    })

    const response = getClassesController.handle(mockHttpRequest)

    expect(mockGetClasses.get).toHaveBeenCalledWith('Math')
    expect(response.statusCode).toBe(
      mockCustomError.toHttpResponse().statusCode
    )
    expect(response.body).toEqual(mockCustomError.toHttpResponse().body)
  })

  it('should handle other errors and return a ServerError response', () => {
    const mockServerError = new ServerError()
    mockGetClasses.get.mockImplementation(() => {
      throw new Error('Some unexpected error')
    })

    const response = getClassesController.handle(mockHttpRequest)

    expect(mockGetClasses.get).toHaveBeenCalledWith('Math')
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(mockServerError.toHttpResponse().body)
  })
})
