import { GuildMember } from "discord.js";

import { ServerDatabasesList } from ".";
import { CaseType } from "./db/models/Case.js";
import { IWarning } from "./interfaces/actions.js";

/* eslint-disable no-unused-vars, no-shadow */
export enum ModerationErrorType {
	Kick = "Kick",
	Ban = "Ban",
	Mute = "Mute",
}
/* eslint-enable no-unused-vars, no-shadow */

export class ModerationError extends Error {
	public readonly type: ModerationErrorType;
	public readonly offenderId: string;

	public constructor(type: ModerationErrorType, offenderId: string) {
		super(`Missing access to ${type.toLowerCase()} user ${offenderId}`);

		this.type = type;
		this.offenderId = offenderId;

		Object.setPrototypeOf(this, ModerationError.prototype);
	}
}

export default class Moderator {
	private readonly serverDatabases: ServerDatabasesList;

	public constructor(serverDatabases: ServerDatabasesList) {
		this.serverDatabases = serverDatabases;
	}

	public async giveWarn(guild: string, offender: string, reason: string, moderator: string): Promise<number> {
		const database = this.serverDatabases.get(guild);

		const currentCase = await database.cases.create({
			type: CaseType.Warning,
			offender,
			reason,
			moderator,
		});
		return currentCase.id;
	}

	public async getWarns(guild: string, offender: string): Promise<IWarning[]> {
		const database = this.serverDatabases.get(guild);

		return (await database.cases.findAll({
			where: {
				type: CaseType.Warning,
				offender,
			},
		})).map(warning => {
			return {
				id: warning.id,
				offender: warning.offender,
				reason: warning.reason,
				moderator: warning.moderator,
				timestamp: warning.timestamp,
			};
		});
	}

	public async kick(offender: GuildMember, reason: string, moderator: string): Promise<number> {
		if (!offender.kickable) throw new ModerationError(ModerationErrorType.Kick, offender.id);

		offender.kick(reason);

		const currentCase = await this.serverDatabases.get(offender.guild.id).cases.create({
			type: CaseType.Kick,
			offender: offender.id,
			reason,
			moderator: moderator,
		});
		return currentCase.id;
	}
}