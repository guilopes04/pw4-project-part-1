import { Class } from '../../domain/entities/class'
import { Student } from '../../domain/entities/student'
import { GetClasses } from '../../domain/use-cases/get-classes'
import { GetClassesRepository } from '../protocols/get-classes-repository'
import { GetStudentsRepository } from '../protocols/get-students-repository'

export class GetClassesImpl implements GetClasses {
  constructor(
    private readonly getClassesRepository: GetClassesRepository,
    private readonly getStudentsRepository: GetStudentsRepository
  ) {}

  get(className?: string): Class[] {
    const allClasses = this.getClassesRepository.get()
    let classesFiltered = allClasses
    if (className) {
      classesFiltered = allClasses.filter(
        (classRepo) => classRepo.className === className
      )
    }

    let classes: any = {}
    for (const classFilt of classesFiltered) {
      if (!classes[classFilt.className]) {
        classes[classFilt.className] = {
          students: []
        }
      }

      classes[classFilt.className].students.push(classFilt.studentId)
    }

    const response: Class[] = []
    for (const key of Object.keys(classes)) {
      const students: Student[] = []
      for (const studentId of classes[key].students) {
        const [student] = this.getStudentsRepository.get(studentId)
        students.push(student)
      }

      response.push({
        name: key,
        students
      })
    }

    return response
  }
}
