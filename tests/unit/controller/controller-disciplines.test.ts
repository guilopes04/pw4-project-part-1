import { GetDisciplines } from '../../../src/domain/use-cases/get-disciplines'
import { GetDisciplinesController } from '../../../src/presentation/controllers/disciplines/get-disciplines-controller'
import {
  CustomError,
  ServerError
} from '../../../src/presentation/helpers/http-helper'

describe('GetDisciplinesController', () => {
  it('should return success response with discipline', () => {
    // Arrange
    const getDisciplinesMock: GetDisciplines = {
      get: jest.fn((disciplineName) => {
        return {
          name: disciplineName,
          students: []
        }
      })
    }

    const httpRequest = {
      queryParameters: {
        disciplineName: 'Math'
      },
      body: {}
    }

    const controller = new GetDisciplinesController(getDisciplinesMock)

    // Act
    const response = controller.handle(httpRequest)

    // Assert
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toEqual({
      discipline: {
        name: 'Math',
        students: []
      }
    })
    expect(getDisciplinesMock.get).toHaveBeenCalledWith('Math')
  })

  it('should handle CustomError', () => {
    const mockCustomError = new CustomError({
      errorCode: '400'
    })
    const getDisciplinesMock: GetDisciplines = {
      get: jest.fn(() => {
        throw new CustomError({ errorCode: '400' })
      })
    }

    const httpRequest = {
      queryParameters: {
        disciplineName: 'InvalidDiscipline'
      },
      body: {}
    }

    const controller = new GetDisciplinesController(getDisciplinesMock)

    // Act
    const response = controller.handle(httpRequest)

    // Assert
    expect(response.statusCode).toBe(
      mockCustomError.toHttpResponse().statusCode
    ) // Assuming CustomError maps to 400 status code
    expect(response.body).toEqual(mockCustomError.toHttpResponse().body)
  })

  it('should handle generic error', () => {
    const mockServerError = new ServerError()
    const getDisciplinesMock: GetDisciplines = {
      get: jest.fn(() => {
        throw new Error('Some generic error')
      })
    }

    const httpRequest = {
      queryParameters: {
        disciplineName: 'Math'
      },
      body: {}
    }

    const controller = new GetDisciplinesController(getDisciplinesMock)

    // Act
    const response = controller.handle(httpRequest)

    // Assert
    expect(response.statusCode).toBe(500) // ServerError
    expect(response.body).toEqual(mockServerError.toHttpResponse().body)
  })
})
