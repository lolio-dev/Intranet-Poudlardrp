import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommentaryStatus } from '@types';
import { UserEntity } from 'src/resources/users/entities/user.entity';

@Entity('commentaries')
export class CommentaryEntity {
  @PrimaryColumn({ unique: true, generated: 'uuid' })
  id: string;

  @Column()
  target: string;

  @Column()
  @ManyToOne(() => UserEntity, (id) => id.id)
  @JoinColumn({ name: 'staff' })
  staff: string;

  @Column()
  content: string;

  @Column()
  status: CommentaryStatus;

  @CreateDateColumn()
  createdAt: Date;
}
