import { IsString } from 'class-validator';

export class CreateProhibitedWordsDto {
  @IsString()
  value: string;

  @IsString()
  replacementValue: string;
}
