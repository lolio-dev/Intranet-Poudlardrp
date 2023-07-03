import { BukkitCustomData } from "./serverStates/BukkitCustomData";

export interface Server {
  id: number;
  serverType: string;
  name: string;
  port: number;
  ip: string;
  version: string;
  state: {
    classCustomData: string;
    customData: BukkitCustomData;
  };
  chat: any
}
