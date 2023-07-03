import { Roles } from '@types';
import { IsArray, IsDate, IsDefined, IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsDefined() @IsUUID()
  id: string;

  @IsDefined() @IsEmail()
  email: string;

  @IsOptional() @IsUUID()
  uuid: string;

  @IsOptional() @IsString()
  discord_id: string;

  @IsDefined() @IsArray()
  roles: Roles[];

  @IsDefined() @IsString()
  nickname: string;

  @IsOptional() @IsString()  
  mcNickname: string;

  @IsDefined() @IsString()
  picture: string;

  @IsOptional() @IsDate()
  createdAt: Date;
}
