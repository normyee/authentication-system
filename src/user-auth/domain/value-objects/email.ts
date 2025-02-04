import { InvalidParamError } from '../common/errors/errors';
import { validateEmail, validateString } from '../common/validators/validators';

export class Email {
  private readonly email: string;

  private constructor(email: string) {
    this.email = email;
    Object.freeze(this);
  }

  static create(email: string): Email {
    if (!validateEmail(email) || !validateString(email))
      throw new InvalidParamError('email');

    return new Email(email);
  }

  get value() {
    return this.email;
  }
}
