import { Roles } from "../enums/Roles";

export interface User {
	email: string;
	uuid: string;
	discord_id: string;
	roles: Roles[];
	nickname: string;
	mcNickname: string;
	picture: string;
	createdAt: Date;
}
