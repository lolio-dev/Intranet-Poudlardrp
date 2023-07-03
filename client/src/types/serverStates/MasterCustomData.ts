import { LoggedPlayer } from "../LoggedPlayer";

export interface MasterCustomData {
	insideLimbo: LoggedPlayer[];
	players: LoggedPlayer[];
	maxPlayer: number;
	uptime: number;
	ramMax: number;
	ramActual: number;
	ramTotal: number;
}
