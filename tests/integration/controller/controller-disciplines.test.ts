import { GetDisciplinesController } from '../../../src/presentation/controllers/disciplines/get-disciplines-controller'
import {
  CustomError,
  MissingParamError,
  ServerError
} from '../../../src/presentation/helpers/http-helper'

// Mocks
const mockGetDisciplines = {
  get: jest.fn()
}

const mockHttpRequest = {
  queryParameters: {
    disciplineName: 'Math'
  }
}

describe('GetDisciplinesController', () => {
  let getDisciplinesController

  beforeEach(() => {
    getDisciplinesController = new GetDisciplinesController(mockGetDisciplines)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return discipline when successful', () => {
    // Mock the return value of the GetDisciplines use case
    const mockDiscipline = {
      name: 'Math',
      students: [
        {
          id: 'student-id',
          name: 'John Doe',
          disciplines: ['Math', 'Science']
        }
      ]
    }
    mockGetDisciplines.get.mockReturnValue(mockDiscipline)

    // Call the controller's handle method
    const response = getDisciplinesController.handle(mockHttpRequest)

    // Assertions
    expect(mockGetDisciplines.get).toHaveBeenCalledWith('Math')
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body).discipline).toEqual(mockDiscipline)
  })

  it('should handle MissingParamError and return its response', () => {
    // Call the controller's handle method without disciplineName
    const response = getDisciplinesController.handle({ queryParameters: {} })

    // Assertion
    const expectedError = new MissingParamError(
      'disciplineName'
    ).toHttpResponse()
    expect(response).toEqual(expectedError)
  })

  it('should handle CustomError and return its response', () => {
    const mockCustomError = new CustomError({
      displayMessage: 'custom error',
      displayTitle: 'Custom Error',
      errorCode: '400'
    })
    mockGetDisciplines.get.mockImplementation(() => {
      throw mockCustomError
    })

    const response = getDisciplinesController.handle(mockHttpRequest)

    expect(mockGetDisciplines.get).toHaveBeenCalledWith('Math')
    expect(response.statusCode).toBe(
      mockCustomError.toHttpResponse().statusCode
    )
    expect(response.body).toEqual(mockCustomError.toHttpResponse().body)
  })

  it('should handle other errors and return a ServerError response', () => {
    const mockServerError = new ServerError()
    mockGetDisciplines.get.mockImplementation(() => {
      throw new Error('Some unexpected error')
    })

    const response = getDisciplinesController.handle(mockHttpRequest)

    expect(mockGetDisciplines.get).toHaveBeenCalledWith('Math')
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(mockServerError.toHttpResponse().body)
  })
})
