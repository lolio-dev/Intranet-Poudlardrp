export interface Ban {
  id: number;
  staff: string;
  target: string;
  date: Date;
  end: Date;
  reason: string;
  definitive: boolean;
  revoked: boolean;
}
