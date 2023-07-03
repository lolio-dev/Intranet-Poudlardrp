import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProhibitedWordsDto } from './dto/create-prohibited-words.dto';
import { Like, Repository } from 'typeorm';
import { ProhibitedWords } from '@types';
import { InjectRepository } from '@nestjs/typeorm';
import { ProhibitedWordEntity } from './entities/prohibited-word.entity';
import { UpdateProhibitedWordDto } from './dto/update-prohibited-word.dto';
import { from, lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class ProhibitedWordsService {
  constructor(
    @InjectRepository(ProhibitedWordEntity)
    private readonly prohibitedWordRepository: Repository<ProhibitedWordEntity>
  ) {
  }

  public findOne(id: string) {
    return from(this.prohibitedWordRepository.findOneBy({ id }))
  }

  public searchWordsByValue(value: string) {
    return from(this.prohibitedWordRepository.find({
      where: { value: Like(`%${value}%`) },
      take: 25
    }));
  }

  public createProhibitedWord(createProhibitedWord: CreateProhibitedWordsDto): Observable<ProhibitedWords> {
    try {
      const prohibitedWord = this.prohibitedWordRepository.create(createProhibitedWord);
      return from(this.prohibitedWordRepository.save(prohibitedWord));
    } catch (e) {
      throw new BadRequestException('ALREADY_EXISTING_VALUE');
    }
  }

  public async updateProhibitedWord(id: string, updateProhibitedWordDto: UpdateProhibitedWordDto) {
    const prohibitedWord = await lastValueFrom(this.findOne(id));
    if (updateProhibitedWordDto.value !== prohibitedWord.value) {
      prohibitedWord.value = updateProhibitedWordDto.value
    }
    if (updateProhibitedWordDto.replacementValue !== prohibitedWord.replacementValue) {
      prohibitedWord.replacementValue = updateProhibitedWordDto.replacementValue
    }

    return from(this.prohibitedWordRepository.save(prohibitedWord));
  }

  public deleteProhibitedWord(id: string) {
    return from(this.prohibitedWordRepository.delete({ id }));
  }
}
