export interface IUserRepository {
  create(data: any): Promise<any>;
  getUserByEmail(email: string): Promise<any>;
  getUserByEmailToken(emailToken: string): Promise<any>;
  getById(id: number): Promise<any>;
  get(): Promise<any[]>;
  update(id: number, data: any): Promise<any>;
  delete(id: number): Promise<any>;
}
