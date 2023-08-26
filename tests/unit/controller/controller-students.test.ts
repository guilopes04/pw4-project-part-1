import { GetStudentsController } from '../../../src/presentation/controllers/students/get-students-controller'
import {
  CustomError,
  ServerError
} from '../../../src/presentation/helpers/http-helper'

// Mocks
const mockGetStudents = {
  get: jest.fn()
}

const mockHttpRequest = {
  pathParameters: {
    studentId: 'student-id'
  },
  queryParameters: {
    getDisciplines: true
  }
}

describe('GetStudentsController', () => {
  let getStudentsController

  beforeEach(() => {
    getStudentsController = new GetStudentsController(mockGetStudents)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return students with disciplines when successful', () => {
    // Mock the return value of the GetStudents use case
    const mockStudentsWithDisciplines = {
      students: [
        {
          id: 'student-id',
          name: 'John Doe',
          disciplines: ['Math', 'Science']
        }
      ]
    }

    mockGetStudents.get.mockReturnValue(mockStudentsWithDisciplines)

    // Call the controller's handle method
    const response = getStudentsController.handle(mockHttpRequest)

    // Assertions
    expect(mockGetStudents.get).toHaveBeenCalledWith('student-id', true)
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body).students).toEqual(
      mockStudentsWithDisciplines
    )
  })

  it('should handle CustomError and return its response', () => {
    const mockCustomError = new CustomError({
      displayMessage: 'custom error',
      displayTitle: 'Custom Error',
      errorCode: '400'
    })
    mockGetStudents.get.mockImplementation(() => {
      throw mockCustomError
    })

    const response = getStudentsController.handle(mockHttpRequest)

    expect(mockGetStudents.get).toHaveBeenCalledWith('student-id', true)
    expect(response.statusCode).toBe(
      mockCustomError.toHttpResponse().statusCode
    )
    expect(response.body).toEqual(mockCustomError.toHttpResponse().body)
  })

  it('should handle other errors and return a ServerError response', () => {
    const mockServerError = new ServerError()
    mockGetStudents.get.mockImplementation(() => {
      throw new Error('Some unexpected error')
    })

    const response = getStudentsController.handle(mockHttpRequest)

    expect(mockGetStudents.get).toHaveBeenCalledWith('student-id', true)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(mockServerError.toHttpResponse().body)
  })
})
