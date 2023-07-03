import { User } from "./User";

enum CommentaryStatus {
  Archived = 'Archived',
  Active = 'Actived',
}

export interface Commentary {
  id: string;
  target: string;
  staff: User;
  content: string;
  status: CommentaryStatus;
  createdAt: Date;
}