import { Mute } from "../types/Mute";
import { Ban } from "../types/Ban";

export const isATimedSanctionActive = (sanctions: Mute[] | Ban[]) => {
  const lastSanction = sanctions[0]

  return lastSanction?.end.getTime() > new Date().getTime() && !lastSanction?.revoked;
}