import { PartialType } from '@nestjs/mapped-types';
import { CreateProhibitedWordsDto } from './create-prohibited-words.dto';

export class UpdateProhibitedWordDto extends PartialType(CreateProhibitedWordsDto) {}
