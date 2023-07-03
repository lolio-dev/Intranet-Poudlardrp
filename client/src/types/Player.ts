import { Quest } from "./Quest";

export interface Player {
  id: number;
  uuid: string;
  name: string;
  discord_id: number;
  discord_tag: string;
  rank: string;
  house: string;
  blood: string;
  quests: {
      actives: Quest[];
      inactives: Quest[];
      finish: Quest[];
  };
}