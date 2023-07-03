import { LoggedPlayer } from "../LoggedPlayer";

export interface BukkitCustomData {
	tps: number[];
	players: LoggedPlayer[];
	maxPlayer: number;
	translationStart: any,
	dataOfTranslationStart: any,
	ramMax: number;
	ramActual: number;
	ramTotal: number;
	uptime: number;
}
