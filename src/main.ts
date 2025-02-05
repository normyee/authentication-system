import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EmailSubscriber } from './user-auth/infra/services/queue/email-consumer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const emailSubscriber = new EmailSubscriber();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await emailSubscriber.startListening();
  await app.listen(3000);
}
bootstrap();
