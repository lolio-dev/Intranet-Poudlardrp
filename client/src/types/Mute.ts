export interface Mute {
  id: number;
  staff: string;
  targer: string;
  date: Date;
  end: Date;
  reason: string;
  revoked: boolean;
}
