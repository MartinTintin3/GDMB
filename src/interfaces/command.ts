/* eslint-disable no-unused-vars */
import { CacheType, ChatInputCommandInteraction, Collection } from "discord.js";

import { CommandOption } from "../option";

interface Command {
	name: string;
	description: string;
	options: CommandOption[];

	execute: (interaction: ChatInputCommandInteraction<CacheType>, commands: Collection<string, Command>) => Promise<any>;
}

export default Command;