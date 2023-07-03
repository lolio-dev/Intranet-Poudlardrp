import { CommentaryStatus } from '@types';

export interface CommentaryDTO {
  id: string;
  target: string;
  staff: string;
  content: string;
  status: CommentaryStatus;
  createdAt: Date;
}
