import * as nodemailer from 'nodemailer';
import { GMAIL_PROVIDER, HOST, PORT } from 'src/config';
import { IMailingValidation } from 'src/user-auth/application/interfaces/mailing-validation';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GmailUserValidationService implements IMailingValidation {
  async execute(targetEmail: string, emailToken: string): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: GMAIL_PROVIDER.EMAIL,
          pass: GMAIL_PROVIDER.APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: `"API de autenticação" <${GMAIL_PROVIDER.EMAIL}>`,
        to: targetEmail,
        subject: 'Por favor verifique o seu e-mail...',
        html: `<p>Olá, verifique o seu endereço de e-mail clicando no link abaixo</p>
        <br>
        <a href="${HOST}:${PORT}/auth/verify-email?emailToken=${emailToken}">Clique aqui para verificar o e-mail</a>`,
      };

      await transporter.sendMail(mailOptions);
      console.log('E-mail de confirmação enviado com sucesso');
    } catch (error) {
      console.error('Erro ao enviar e-mail de confirmação:', error);
    }
  }
}
