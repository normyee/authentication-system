import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class UserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, {
    message:
      'A senha deve conter pelo menos 6 caracteres, incluindo pelo menos um número.',
  })
  password: string;
}
