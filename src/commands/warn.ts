import { CacheType, ChatInputCommandInteraction } from "discord.js";
import Command from "../interfaces/command";
import { CommandStringOption, CommandUserOption } from "../option.js";

export default {
	name: "warn",
	description: "Warn a member",
	options: [
		new CommandUserOption("member", "The member to warn", true),
		new CommandStringOption("reason", "The reason for the warn", false),
	],
	execute: async (interaction: ChatInputCommandInteraction<CacheType>) => {
		await interaction.reply("pong");
	},
} as Command;