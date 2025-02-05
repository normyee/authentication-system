import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

import { IEmailToken } from 'src/user-auth/application/interfaces/email-token';

@Injectable()
export class EmailTokenService implements IEmailToken {
  generate(): string {
    return crypto.randomBytes(64).toString('hex');
  }
}
