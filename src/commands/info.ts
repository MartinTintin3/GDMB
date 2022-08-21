import ICommand from "../interfaces/command";
import { CommandUserOption } from "../option.js";

export default {
	name: "info",
	description: "Get info about of a user",
	options: [
		new CommandUserOption("user", "The user to get info on", true),
	],
	execute: async ({ interaction }) => {
		const member = interaction.guild.members.cache.get(interaction.options.getUser("user").id);

		return await interaction.reply({
			embeds: [
				{
					title: `Info about ${member.user.tag}`,
					description: `**Moderatable:** ${member.moderatable}\n**Kickable:** ${member.kickable}\n**Bannable:** ${member.bannable}\n**Manageable:** ${member.manageable}`,
				},
			],
		});
	},
} as ICommand;