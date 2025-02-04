export interface IListRepository {
  create(userId: number, data: any): Promise<any>;
  getById(id: number): Promise<any>;
  update(id: number, data: any): Promise<any>;
  delete(id: number): Promise<any>;
}
