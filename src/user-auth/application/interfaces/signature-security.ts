export interface ISignatureSecutiry {
  generateCredentialToken(id: number): any;
  verifyCredentialToken(key: string): any;
}
