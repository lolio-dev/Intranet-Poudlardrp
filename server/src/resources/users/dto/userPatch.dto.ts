import { PartialType } from "@nestjs/mapped-types";
import { PickType } from "@nestjs/mapped-types/dist";
import { UserDto } from "./user.dto";

export class UserPatchDto extends PartialType(
  PickType(UserDto, ['uuid', 'discord_id', 'mcNickname', 'picture'] as const)
) {}