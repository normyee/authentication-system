export interface IEmailPublisher {
  publishMessage(targetEmail: string, emailToken: string): Promise<void>;
  closeConnection(): Promise<void>;
}
