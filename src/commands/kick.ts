import { PermissionFlagsBits } from "discord.js";

import ICommand from "../interfaces/command";
import { ModerationError } from "../moderator.js";
import { CommandStringOption, CommandUserOption } from "../option.js";

export default {
	name: "kick",
	description: "Kick a user",
	defaultPermissions: PermissionFlagsBits.KickMembers,
	options: [
		new CommandUserOption("user", "The user to kick", true),
		new CommandStringOption("reason", "The reason for the kick", false),
	],
	execute: async ({ interaction, moderator }) => {
		const member = interaction.guild.members.cache.get(interaction.options.getUser("user").id);
		const reason = interaction.options.getString("reason");

		try {
			const caseId = await moderator.kick(member, reason, interaction.user.id);
			await interaction.reply(`**${member.displayName}** has been **kicked**(#${caseId}). ${reason == null ? "" : `**Reason**: ${reason}`}`);
		} catch (e) {
			if (e instanceof ModerationError) {
				return await interaction.reply("I don't have permission to kick that user");
			} else {
				throw e;
			}
		}
	},
} as ICommand;