export class InvalidParamError extends Error {
  public readonly param: string;

  constructor(param: string) {
    super(`Parâmetro inválido: ${param}`);
    this.param = param;

    this.name = 'InvalidParamError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidParamError);
    }
  }
}
