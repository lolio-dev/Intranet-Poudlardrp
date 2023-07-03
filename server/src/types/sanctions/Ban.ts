export interface Ban {
  id: number;
  staff: string;
  target: string;
  date: number;
  end: number;
  reason: string;
  definitive: boolean;
  revoked: boolean;
}
