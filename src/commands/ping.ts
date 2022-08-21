import { CacheType, ChatInputCommandInteraction } from "discord.js";

import ICommand from "../interfaces/command";

export default {
	name: "ping",
	description: "Replies with pong",
	options: [],
	execute: async ({ interaction }) => {
		await interaction.reply("pong");
	},
} as ICommand;