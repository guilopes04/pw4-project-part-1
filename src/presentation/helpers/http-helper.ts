import { HttpResponse } from './http'

export type ApiErrorResponseBody = {
  errorCode: string
  errorMessage?: string
  displayTitle?: string
  displayMessage?: string
  localizedMessage?: string
  localizedTitle?: string
}

export type CustomErrorProps = { statusCode?: number } & ApiErrorResponseBody

export class CustomError extends Error {
  constructor(protected readonly props: CustomErrorProps) {
    super(props.errorMessage)
  }

  toHttpResponse(): HttpResponse {
    return {
      statusCode: this.props.statusCode ?? 500,
      body: JSON.stringify(this.info)
    }
  }

  protected get info() {
    const {
      errorCode,
      errorMessage,
      displayTitle,
      displayMessage,
      localizedMessage,
      localizedTitle
    } = this.props
    return {
      errorCode,
      errorMessage,
      displayTitle,
      displayMessage,
      localizedMessage,
      localizedTitle
    }
  }
}

export class ServerError extends CustomError {
  constructor() {
    super({
      statusCode: 500,
      errorCode: 'SERVER_ERROR',
      errorMessage: 'Internal Server Error',
      localizedTitle: 'Ocorreu um erro inesperado',
      localizedMessage: 'Ocorreu um erro inesperado'
    })
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super({
      statusCode: 403,
      errorCode: 'FORBIDDEN_ERROR',
      errorMessage: 'Forbidden error: ' + message,
      localizedTitle: 'Acesso não permitido',
      localizedMessage: 'Acesso não permitido'
    })
  }
}

export class NotFoundError extends CustomError {
  constructor() {
    super({
      statusCode: 404,
      errorCode: 'NOT_FOUND_ERROR',
      errorMessage: 'Not found error',
      localizedTitle: 'Não encontrado',
      localizedMessage: 'Não encontrado'
    })
  }
}

export class MissingParamError extends CustomError {
  constructor(...params: string[]) {
    const s = params.join(', ')
    super({
      statusCode: 400,
      errorCode: 'MISSING_PARAM_ERROR',
      errorMessage: 'Missing input parameter(s): ' + s,
      localizedTitle: 'Campos não preenchidos',
      localizedMessage: 'Os seguintes campos requerem um valor: ' + s
    })
  }
}

export class StudentDoesNotExistError extends CustomError {
  constructor(studentId: string) {
    super({
      statusCode: 400,
      errorCode: 'STUDENT_DOES_NOT_EXIST',
      errorMessage: `Student with studentId ${studentId} does not exists`,
      localizedTitle: `Student not exists`,
      localizedMessage: `Estudante com identificador ${studentId} não existe`
    })
  }
}

export class UnprocessableEntityError extends CustomError {
  constructor(...params: string[]) {
    const s = params.join(', ')
    super({
      statusCode: 422,
      errorCode: 'UNPROCESSABLE_ENTITY_ERROR',
      errorMessage: 'Invalid input parameter(s): ' + s,
      localizedTitle: 'Campos com valores inválidos',
      localizedMessage: 'Os seguintes campos contêm valores inválidos: ' + s
    })
  }
}

export class ReferenceDoesNotExistsError extends CustomError {
  constructor() {
    super({
      statusCode: 404,
      errorCode: 'REFERENCE_DOES_NOT_EXISTS',
      errorMessage: 'Reference does not exists',
      localizedTitle: 'Referência não encontrada',
      localizedMessage: 'Referência não encontrada'
    })
  }
}
export class InvalidLocationError extends CustomError {
  constructor() {
    super({
      statusCode: 400,
      errorCode: 'InvalidLocation',
      errorMessage: 'We were unable to validate your location.',
      localizedMessage:
        'Não fomos capazes de validar sua localização. Habilite o GPS do seu celular',
      localizedTitle: 'Onde você tá?'
    })
  }
}
export class OutsideAvailableAreaError extends CustomError {
  constructor() {
    super({
      statusCode: 400,
      errorCode: 'OutsideAvailableArea',
      errorMessage: "You're outside of the availability area.",
      localizedMessage:
        'Você está fora da área de disponibilidade para marcar presença.',
      localizedTitle: 'Você está no local de aula?'
    })
  }
}
export class OutsideTimeLectureError extends CustomError {
  constructor() {
    super({
      statusCode: 400,
      errorCode: 'OutsideTimeLecture',
      errorMessage: "You're outside time lecture.",
      localizedMessage:
        'Aguarde até que ela fique disponível para marcar sua presença',
      localizedTitle: 'Esta aula não está disponível'
    })
  }
}

export class OutsideTimeLectureTeacherError extends CustomError {
  constructor() {
    super({
      statusCode: 400,
      errorCode: 'OutsideTimeLecture',
      errorMessage: "You're outside time lecture.",
      localizedMessage:
        'Aguarde até que ela fique disponível iniciar o período de presença',
      localizedTitle: 'Esta aula não está disponível'
    })
  }
}

export class AlreadyLectureInAttendenceTimeError extends CustomError {
  constructor() {
    super({
      statusCode: 400,
      errorCode: 'AlreadyLectureInAttendenceTime',
      errorMessage: 'Already another lecture for you in attendence time',
      localizedMessage:
        'Você tem outra aula com a janela de presença aberta, por favor finalize-a antes de iniciar outra janela de presença',
      localizedTitle: 'Desculpe, você não pode iniciar a janela de presença.'
    })
  }
}

export class AlreadyAnsweredError extends CustomError {
  constructor(localizedMessage: string, localizedTitle: string) {
    super({
      statusCode: 400,
      errorCode: 'AlreadyAnswered',
      errorMessage:
        "You're trying to answer a quiz that has already been answered",
      localizedMessage,
      localizedTitle
    })
  }
}
export class AlreadyTeacherAbsenceError extends CustomError {
  constructor() {
    super({
      statusCode: 400,
      errorCode: 'AlreadyTeacherAbsence',
      errorMessage:
        "You're trying to report a teacher absence in a lecture that you have already reported",
      localizedMessage:
        'Você está reportar a falta do professor numa aula que você já reportou',
      localizedTitle: 'Opa, esqueceu?'
    })
  }
}

export class AlreadyPresenceError extends CustomError {
  constructor() {
    super({
      statusCode: 400,
      errorCode: 'AlreadyPresence',
      errorMessage:
        "You're trying post presence in a lecture that student have already presence",
      localizedMessage:
        'Você está tentando atribuir presença a aula que o estudante já possui presença',
      localizedTitle: 'Ocorreu um erro.'
    })
  }
}

export class UpdatePointsError extends CustomError {
  constructor() {
    super({
      statusCode: 400,
      errorCode: 'ErrorWhileUpdatePoints',
      errorMessage: 'Error while update points',
      localizedMessage: 'Erro ao atribuir pontos',
      localizedTitle: 'Ops!'
    })
  }
}

export class UpdatePresenceStatusError extends CustomError {
  constructor() {
    super({
      statusCode: 400,
      errorCode: 'ErrorWhilePresenceStatus',
      errorMessage: 'Error while update presence status',
      localizedMessage:
        'A presença do aluno não foi atualizada, por favor, tente novamente.',
      localizedTitle: 'Ocorreu um erro.'
    })
  }
}

export class ForbiddenCustomError extends CustomError {
  constructor(
    errorMessage: string,
    localizedMessage: string,
    localizedTitle: string
  ) {
    super({
      statusCode: 403,
      errorCode: 'FORBIDDEN_ERROR',
      errorMessage,
      localizedMessage,
      localizedTitle
    })
  }
}

export class DependencyError extends CustomError {
  constructor() {
    super({
      statusCode: 500,
      errorCode: 'DependecyError',
      errorMessage: "Error while attepmting to authenticate in provider's API",
      localizedMessage:
        'Um erro desconhecido ocorreu na hora de tentar acessar sua conta'
    })
  }
}

export class InvalidLogin extends CustomError {
  constructor() {
    super({
      statusCode: 401,
      errorCode: 'Unauthorized',
      errorMessage: 'Invalid username or password',
      localizedMessage: 'Verifique se seu usuário e senha estão corretos'
    })
  }
}
export class NoUserType extends CustomError {
  constructor() {
    super({
      statusCode: 401,
      errorCode: 'NoUserType',
      errorMessage: 'The user does not have a corresponding type',
      localizedMessage: 'Não foi possível determinar seu nível de acesso'
    })
  }
}

export class PrizeExpiredError extends CustomError {
  constructor() {
    super({
      statusCode: 401,
      errorCode: 'PrizeExpired',
      errorMessage: 'Prize expired, time to collect prize has been exceeded',
      localizedMessage:
        'Prêmio expirado, o prazo de 30 dias para coletar o prêmio foi excedido.'
    })
  }
}

export class KeyPairAlreadyExists extends CustomError {
  constructor() {
    super({
      statusCode: 400,
      errorCode: 'KeyPairAlreadyExists',
      errorMessage: 'Generated key pair already exists',
      localizedMessage: 'Ops, uma chave ja foi configurada para essa aula.'
    })
  }
}

export class SignatureFailed extends CustomError {
  constructor() {
    super({
      statusCode: 400,
      errorCode: 'SignatureFailed',
      errorMessage: 'The signature send is not valid',
      localizedMessage: 'Ops, a assinatura enviada não é válida.'
    })
  }
}

export class QRCodeAlreadyUsed extends CustomError {
  constructor() {
    super({
      statusCode: 400,
      errorCode: 'QRCodeAlreadyUsed',
      errorMessage: 'QR code already used',
      localizedMessage: 'Ops, esse QR code ja foi utilizado.'
    })
  }
}
