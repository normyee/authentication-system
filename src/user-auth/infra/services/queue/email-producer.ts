import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import { QUEUE_HOST } from 'src/config';
import { IEmailPublisher } from 'src/user-auth/application/interfaces/email-publisher';

@Injectable()
export class EmailPublisher implements IEmailPublisher {
  private readonly queue: string = 'mail_queue';
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor() {
    this.init();
  }

  private async init() {
    this.connection = await amqp.connect(QUEUE_HOST);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue, { durable: false });
  }

  public async publishMessage(targetEmail: string, emailToken: string) {
    const message = JSON.stringify({ targetEmail, emailToken });
    this.channel.sendToQueue(this.queue, Buffer.from(message));
    console.log('Mensagem enviada para a fila:', message);

    await this.closeConnection();
  }

  public async closeConnection() {
    setTimeout(() => {
      this.connection.close();
    }, 500);
  }
}
