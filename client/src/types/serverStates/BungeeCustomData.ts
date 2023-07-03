import { LoggedPlayer } from "../LoggedPlayer";

export interface BungeeCustomData {
	players: LoggedPlayer[];
	insideLimbo: LoggedPlayer[];
	maxPlayer: number;
	ramMax: number;
	ramActual: number;
	ramTotal: number;
	uptime: number;
}
