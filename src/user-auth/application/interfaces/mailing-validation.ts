export interface IMailingValidation {
  execute(targetEmail: string, emailToken: string): Promise<void>;
}
