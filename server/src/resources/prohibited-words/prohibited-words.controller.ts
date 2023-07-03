import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProhibitedWordsService } from './prohibited-words.service';
import { CreateProhibitedWordsDto } from './dto/create-prohibited-words.dto';
import { UpdateProhibitedWordDto } from './dto/update-prohibited-word.dto';
import { UseQueryFilter } from '../../filters';
import { JwtAuthGuard } from '../../auth/guards/jwt-aut.guard';

@Controller('prohibited-words')
@UseGuards(JwtAuthGuard)
export class ProhibitedWordsController {
  constructor(private readonly prohibitedWordsService: ProhibitedWordsService) {
  }

  @Post()
  @UseQueryFilter('ALREADY_EXISTING_VALUE')
  create(
    @Body() createProhibitedWord: CreateProhibitedWordsDto
  ) {
    return this.prohibitedWordsService.createProhibitedWord(createProhibitedWord);
  }

  @Post('search')
  searchByValue(
    @Body() { value }: { value: string }
  ) {
    return this.prohibitedWordsService.searchWordsByValue(value);
  }

  @Patch(':id')
  @UseQueryFilter('ALREADY_EXISTING_VALUE')
  patch(
    @Body() updateProhibitedWordDto: UpdateProhibitedWordDto,
    @Param("id") prohibitedWordId: string
  ) {
    return this.prohibitedWordsService.updateProhibitedWord(prohibitedWordId, updateProhibitedWordDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.prohibitedWordsService.deleteProhibitedWord(id);
  }
}
