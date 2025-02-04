import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class ListDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  items: string[];
}
