import { Entity } from 'typeorm';
import { Column, PrimaryColumn } from 'typeorm';

@Entity('prohibited-words')
export class ProhibitedWordEntity {
  @PrimaryColumn({ unique: true, generated: 'uuid' })
  id: string;

  @Column({
    unique: true
  })
  value: string;

  @Column({
    nullable: true
  })
  replacementValue: string;
}
