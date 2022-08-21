import { config as _ } from "dotenv";
_();

import { CacheType, ChatInputCommandInteraction, Client, Collection, GatewayIntentBits } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import { Sequelize } from "sequelize";

import ICommand from "./interfaces/command";
import { Case, init as CaseInit } from "./db/models/Case.js";
import Moderator from "./moderator.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

export type ServerDatabasesList = Collection<string, { sequelize: Sequelize, cases: typeof Case }>;

export interface CommandExternalData {
	interaction: ChatInputCommandInteraction<CacheType>,
	moderator: Moderator,
	serverDatabases: ServerDatabasesList,
	commands: Collection<string, ICommand>;
}

const serverDatabases: ServerDatabasesList = new Collection<string, { sequelize: Sequelize, cases: typeof Case }>();
const moderator = new Moderator(serverDatabases);
const commands = new Collection<string, ICommand>();

client.once("ready", async () => {
	console.log("ready");

	const serverDatabasesDir = "./out/src/db/servers";
	if (!fs.existsSync(serverDatabasesDir)) fs.mkdirSync(serverDatabasesDir);

	client.guilds.cache.forEach(async guild => {
		const sequelize = new Sequelize({
			host: "localhost",
			dialect: "sqlite",
			logging: console.log,
			storage: path.join(serverDatabasesDir, `${guild.id}.db`),
		});
		
		const Cases = CaseInit(sequelize);

		serverDatabases.set(guild.id, {
			sequelize,
			cases: Cases,
		});

		await sequelize.sync();

		console.log(`Guild "${guild.name}" (${guild.id}) database opened`);
	});
});

client.on("interactionCreate", async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute({ interaction, serverDatabases, moderator, commands });
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: "There was an error executing that command", ephemeral: true });
	}
});

(async () => {
	const commandFilesPath = path.join(path.dirname("."), "out/src/commands");
	const commandFiles = fs.readdirSync(commandFilesPath).filter(file => file.endsWith(".js"));
	
	for (const file of commandFiles) {
		const command: ICommand = (await import("." + path.sep + path.join("commands", file))).default;

		commands.set(command.name, command);
	}
})().then(() => client.login(process.env.TOKEN));

const exit = async () => {
	console.log("Closing all database connections...");
	
	for (const [guildId, { sequelize }] of serverDatabases) {
		await sequelize.close();
		console.log(`Closed database connection for ${guildId}`);
	}

	console.log("Closed all database connections");
};

/*process.on("exit", async () => await exit());
process.on("beforeExit", async () => await exit());
process.on("SIGINT", async () => await exit());*/