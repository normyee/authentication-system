import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  create(): string {
    return 'Hello World!';
  }
}
