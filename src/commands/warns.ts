import ICommand from "../interfaces/command";
import { CommandUserOption } from "../option.js";
import config from "../../config.json" assert { type: "json" };

export default {
	name: "warns",
	description: "List all warns of a user",
	options: [
		new CommandUserOption("user", "User to check", true),
	],
	execute: async ({ interaction, moderator }) => {
		const member = interaction.guild.members.cache.get(interaction.options.getUser("user").id);

		const warnings = await moderator.getWarns(member.guild.id, member.id);

		await interaction.reply({
			embeds: [{
				title: `${warnings.length} warning${warnings.length == 1 ? "" : "s"} found for ${member.user.tag}`,
				color: config.botColor,
				fields: warnings.map(warning => {
					return {
						name: `#${warning.id} | ${warning.timestamp.toDateString()}`,
						value: `**Reason:** ${warning.reason}\n**Moderator:** <@${warning.moderator}>`,
						inline: true,
					};
				}),
				timestamp: new Date().toISOString(),
			}],
		});
	},
} as ICommand;