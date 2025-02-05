import * as crypto from 'crypto';

import { IEmailToken } from 'src/user-auth/application/interfaces/email-token';

export class EmailTokenService implements IEmailToken {
  generate(): string {
    return crypto.randomBytes(64).toString('hex');
  }
}
