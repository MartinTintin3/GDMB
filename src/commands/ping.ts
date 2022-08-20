import { CacheType, ChatInputCommandInteraction } from "discord.js";
import Command from "../interfaces/command";

export default {
	name: "ping",
	description: "Replies with pong",
	options: [],
	execute: async (interaction: ChatInputCommandInteraction<CacheType>) => {
		await interaction.reply("pong");
	},
} as Command;