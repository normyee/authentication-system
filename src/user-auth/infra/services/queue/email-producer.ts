import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class EmailPublisher {
  private readonly queue: string = 'mail_queue';
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor() {
    this.init();
  }

  private async init() {
    this.connection = await amqp.connect('amqp://localhost');
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
