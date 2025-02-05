import * as amqp from 'amqplib';
import { QUEUE_HOST } from 'src/config';
import { IMailingValidation } from 'src/user-auth/application/interfaces/mailing-validation';

export class EmailSubscriber {
  private readonly queue: string = 'mail_queue';

  constructor(private readonly _mailingValidation: IMailingValidation) {}

  public async startListening() {
    try {
      const connection = await amqp.connect(QUEUE_HOST);
      const channel = await connection.createChannel();

      await channel.assertQueue(this.queue, { durable: false });

      console.log('Aguardando mensagens na fila:', this.queue);

      channel.consume(this.queue, async (msg) => {
        if (msg) {
          const { targetEmail, emailToken } = JSON.parse(
            msg.content.toString(),
          );
          console.log('Processando e-mail para:', targetEmail);

          try {
            await this._mailingValidation.execute(targetEmail, emailToken);
            console.log('E-mail enviado com sucesso para:', targetEmail);
          } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
          }

          channel.ack(msg);
        }
      });
    } catch (error) {
      console.error('Erro ao conectar ou consumir da fila:', error);
    }
  }
}
