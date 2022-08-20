import { APIApplicationCommandOptionChoice, ApplicationCommandOptionType, ChannelType } from "discord.js";

export interface ICommandOption {
	name: string;
	description: string;
	required: boolean;
	type: ApplicationCommandOptionType;
}

export interface ICommandAttachmentOption extends ICommandOption { }

export interface ICommandBooleanOption extends ICommandOption { }

export interface ICommandChannelOption extends ICommandOption {
	channelTypes?: (ChannelType.GuildText | ChannelType.GuildVoice | ChannelType.GuildCategory | ChannelType.GuildNews | ChannelType.GuildNewsThread | ChannelType.GuildPublicThread | ChannelType.GuildPrivateThread | ChannelType.GuildStageVoice)[];
}

export interface ICommandIntegerOption extends ICommandOption {
	autocomplete?: boolean;
	choices?: APIApplicationCommandOptionChoice<number>[];
	minValue?: number;
	maxValue?: number;
}

export interface ICommandMentionableOption extends ICommandOption { }

export interface ICommandNumberOption extends ICommandOption {
	autocomplete?: boolean;
	choices?: APIApplicationCommandOptionChoice<number>[];
	minValue?: number;
	maxValue?: number;
}

export interface ICommandRoleOption extends ICommandOption { }

export interface ICommandStringOption extends ICommandOption {
	autocomplete?: boolean;
	choices?: APIApplicationCommandOptionChoice<string>[];
	minLength?: number;
	maxLength?: number;
}

export interface ICommandUserOption extends ICommandOption { }