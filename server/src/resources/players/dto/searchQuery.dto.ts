import { IsDefined, IsString } from "class-validator";

export class SearchQueryDto {
  @IsDefined() @IsString()
  name: string;
}