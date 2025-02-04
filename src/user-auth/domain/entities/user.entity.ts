import { InvalidParamError } from '../common/errors/errors';
import {
  validateName,
  validatePassword,
} from '../common/validators/validators';
import { Email } from '../value-objects/email';

export class User {
  public readonly id: number;
  private _name: string;
  public readonly email: Email;
  private _password: string;
  private _verified: boolean = false;
  private _lists: string[] = [];

  private constructor(
    id: number,
    name: string,
    email: Email,
    password: string,
    verified: boolean,
    lists: string[] = [],
  ) {
    this.id = id;
    this._name = name;
    this.email = email;
    this._password = password;
    this._verified = verified;
    this._lists = lists;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (!validateName(value)) {
      throw new InvalidParamError('name');
    }
    this._name = value;
  }

  get emailValue(): string {
    return this.email.value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    if (!validatePassword(value)) {
      throw new InvalidParamError('password');
    }
    this._password = value;
  }

  get verified(): boolean {
    return this._verified;
  }

  set verified(value: boolean) {
    this._verified = value;
  }

  get lists(): string[] {
    return this._lists;
  }

  set lists(value: string[]) {
    this._lists = value;
  }

  static create(userData: {
    id: number;
    name: string;
    email: string;
    password: string;
    verified: boolean;
    lists?: string[];
  }): User {
    if (!validateName(userData.name)) throw new InvalidParamError('name');

    if (!validatePassword(userData.password))
      throw new InvalidParamError('password');

    const email = Email.create(userData.email);

    return new User(
      userData.id,
      userData.name,
      email,
      userData.password,
      userData.verified,
      userData.lists || [],
    );
  }
}
