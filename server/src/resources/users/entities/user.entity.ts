import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { Roles } from '@types';

@Entity('users')
export class UserEntity {
  @PrimaryColumn({ unique: true, generated: 'uuid' })
  id: string;

  @Column({ nullable: true })
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  discord_id?: string;

  @Column('simple-array')
  roles: Roles[];

  @Column()
  nickname: string;

  @Column({ nullable: true })
  mcNickname: string;

  @Column("text")
  picture: string;

  @CreateDateColumn()
  createdAt: Date;
}
