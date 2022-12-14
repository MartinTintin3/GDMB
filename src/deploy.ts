import { config as _ } from "dotenv";
_();

import { REST, Routes, SlashCommandBuilder } from "discord.js";
import * as fs from "fs";
import * as path from "path";

import ICommand from "./interfaces/command";
import config from "../config.json" assert { type: "json" };
import { OptionsBuilder } from "./option";

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

const commands = [];

(async () => {
	console.log("Refreshing (/) commands");

	const commandFilesPath = path.join(path.dirname("."), "out/src/commands");
	const commandFiles = fs.readdirSync(commandFilesPath).filter(file => file.endsWith(".js"));

	for (const file of commandFiles) {
		const command: ICommand = (await import("." + path.sep + path.join("commands", file))).default;

		let slashCommand: SlashCommandBuilder | OptionsBuilder = new SlashCommandBuilder()
			.setName(command.name)
			.setDescription(command.description)
			.setDMPermission(false);

		if (command.defaultPermissions != null) slashCommand.setDefaultMemberPermissions(command.defaultPermissions);

		command.options.forEach(option => slashCommand = option.addToBuilder(slashCommand));

		commands.push(slashCommand.toJSON());
	}

	// await rest.put(Routes.applicationGuildCommands(config.clientId, config.homeGuildId), { body: commands });
	await rest.put(Routes.applicationCommands(config.clientId), { body: commands });

	console.log("(/) commands refreshed");
})();