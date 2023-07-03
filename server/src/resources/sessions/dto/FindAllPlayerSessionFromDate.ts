import { IsNumber } from 'class-validator';

export class FindAllPlayerSessionFromDateDto {
  @IsNumber()
  date: number;
}
