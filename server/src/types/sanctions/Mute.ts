export interface Mute {
  id: number;
  staff: string;
  target: string;
  date: number;
  end: number;
  reason: string;
  revoked: boolean;
}
