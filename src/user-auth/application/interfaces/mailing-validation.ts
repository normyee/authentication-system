export interface MailingValidation {
  execute(targetEmail: string, emailToken: string): Promise<void>;
}
