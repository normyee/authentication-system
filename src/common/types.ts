import { Request } from 'express';

export interface Session {
  userId: number;
  token: string;
}

export interface RequestSession extends Request {
  session: Session;
}
