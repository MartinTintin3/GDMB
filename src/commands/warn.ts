import ICommand from "../interfaces/command";
import { CommandStringOption, CommandUserOption } from "../option.js";

export default {
	name: "warn",
	description: "Warn a user",
	options: [
		new CommandUserOption("user", "The user to warn", true),
		new CommandStringOption("reason", "The reason for the warn", false),
	],
	execute: async ({ interaction, moderator }) => {
		const member = interaction.guild.members.cache.get(interaction.options.getUser("user").id);
		const reason = interaction.options.getString("reason");

		const caseId = await moderator.giveWarn(interaction.guildId, member.id, reason, interaction.user.id);
		await interaction.reply(`**${member.displayName}** has been warned(#${caseId})`);
	},
} as ICommand;