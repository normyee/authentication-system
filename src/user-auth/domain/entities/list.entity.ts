import { InvalidParamError } from '../common/errors/errors';
import { validateName } from '../common/validators/validators';
import { User } from './user.entity';

export class List {
  private _id: number;
  private _name: string;
  private _items: string[];
  private _userId: number;
  private _user: User;

  private constructor(
    id: number,
    name: string,
    items: string[],
    userId: number,
    user: User,
  ) {
    this._id = id;
    this._name = name;
    this._items = items;
    this._userId = userId;
    this._user = user;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (!validateName(value)) throw new InvalidParamError('name');
    this._name = value;
  }

  get items(): string[] {
    return this._items;
  }

  set items(value: string[]) {
    this._items = value;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  static create(listData: {
    id: number;
    name: string;
    items: string[];
    userId: number;
    user: User;
  }): List {
    if (!validateName(listData.name)) throw new InvalidParamError('name');

    return new List(
      listData.id,
      listData.name,
      listData.items,
      listData.userId,
      listData.user,
    );
  }
}
