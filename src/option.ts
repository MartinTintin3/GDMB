import { APIApplicationCommandOptionChoice, ApplicationCommandOptionType, ChannelType, SlashCommandBuilder } from "discord.js";

import { ICommandAttachmentOption, ICommandBooleanOption, ICommandChannelOption, ICommandIntegerOption, ICommandMentionableOption, ICommandNumberOption, ICommandRoleOption, ICommandStringOption, ICommandUserOption } from "./interfaces/option";

export type OptionsBuilder = SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

export class CommandOption {
	public readonly name: string;
	public readonly description: string;
	public readonly required: boolean;
	public readonly type: ApplicationCommandOptionType;

	public constructor(name: string, description: string, required: boolean, type: ApplicationCommandOptionType) {
		this.name = name;
		this.description = description;
		this.required = required;
		this.type = type;
	}

	// eslint-disable-next-line no-unused-vars
	public addToBuilder(builder: OptionsBuilder): OptionsBuilder {
		throw new Error("Cannot add base CommandOption class to builder");
	}
}

export class CommandStringOption extends CommandOption implements ICommandStringOption {
	autocomplete?: boolean;
	choices?: APIApplicationCommandOptionChoice<string>[];
	minLength?: number;
	maxLength?: number;

	public constructor(name: string, description: string, required: boolean, autocomplete?: boolean, choices?: APIApplicationCommandOptionChoice<string>[], minLength?: number, maxLength?: number) {
		super(name, description, required, ApplicationCommandOptionType.String);

		this.autocomplete = autocomplete;
		this.choices = choices;
		this.minLength = minLength;
		this.maxLength = maxLength;
	}

	public override addToBuilder(builder: OptionsBuilder): OptionsBuilder {
		return builder.addStringOption(option => {
			option.setName(this.name).setDescription(this.description).setRequired(this.required);

			if (this.autocomplete != null) option.setAutocomplete(this.autocomplete);
			if (this.choices != null) option.addChoices(...this.choices);
			if (this.minLength != null)	option.setMinLength(this.minLength);
			if (this.maxLength != null)	option.setMaxLength(this.maxLength);

			return option;
		});
	}
}

export class CommandIntegerOption extends CommandOption implements ICommandIntegerOption {
	autocomplete?: boolean;
	choices?: APIApplicationCommandOptionChoice<number>[];
	minValue?: number;
	maxValue?: number;

	public constructor(name: string, description: string, required: boolean, autocomplete?: boolean, choices?: APIApplicationCommandOptionChoice<number>[], minLength?: number, maxLength?: number) {
		super(name, description, required, ApplicationCommandOptionType.String);

		this.autocomplete = autocomplete;
		this.choices = choices;
		this.minValue = minLength;
		this.maxValue = maxLength;
	}

	public override addToBuilder(builder: OptionsBuilder): OptionsBuilder {
		return builder.addIntegerOption(option => {
			option.setName(this.name).setDescription(this.description).setRequired(this.required);

			if (this.autocomplete != null) option.setAutocomplete(this.autocomplete);
			if (this.choices != null) option.addChoices(...this.choices);
			if (this.minValue != null) option.setMinValue(this.minValue);
			if (this.maxValue != null) option.setMaxValue(this.maxValue);

			return option;
		});
	}
}

export class CommandBooleanOption extends CommandOption implements ICommandBooleanOption {
	public constructor(name: string, description: string, required: boolean) {
		super(name, description, required, ApplicationCommandOptionType.String);
	}

	public override addToBuilder(builder: OptionsBuilder): OptionsBuilder {
		return builder.addBooleanOption(option => {
			return option.setName(this.name).setDescription(this.description).setRequired(this.required);
		});
	}
}

export class CommandUserOption extends CommandOption implements ICommandUserOption {
	public constructor(name: string, description: string, required: boolean) {
		super(name, description, required, ApplicationCommandOptionType.String);
	}

	public override addToBuilder(builder: OptionsBuilder): OptionsBuilder {
		return builder.addUserOption(option => {
			return option.setName(this.name).setDescription(this.description).setRequired(this.required);
		});
	}
}

export class CommandChannelOption extends CommandOption implements ICommandChannelOption {
	channelTypes?: (ChannelType.GuildText | ChannelType.GuildVoice | ChannelType.GuildCategory | ChannelType.GuildNews | ChannelType.GuildNewsThread | ChannelType.GuildPublicThread | ChannelType.GuildPrivateThread | ChannelType.GuildStageVoice)[];

	public constructor(name: string, description: string, required: boolean, channelTypes?: (ChannelType.GuildText | ChannelType.GuildVoice | ChannelType.GuildCategory | ChannelType.GuildNews | ChannelType.GuildNewsThread | ChannelType.GuildPublicThread | ChannelType.GuildPrivateThread | ChannelType.GuildStageVoice)[]) {
		super(name, description, required, ApplicationCommandOptionType.String);

		this.channelTypes = channelTypes;
	}

	public override addToBuilder(builder: OptionsBuilder): OptionsBuilder {
		return builder.addChannelOption(option => {
			option.setName(this.name).setDescription(this.description).setRequired(this.required);

			if (this.channelTypes != null) option.addChannelTypes(...this.channelTypes);

			return option;
		});
	}
}

export class CommandRoleOption extends CommandOption implements ICommandRoleOption {
	public constructor(name: string, description: string, required: boolean) {
		super(name, description, required, ApplicationCommandOptionType.String);
	}

	public override addToBuilder(builder: OptionsBuilder): OptionsBuilder {
		return builder.addRoleOption(option => {
			return option.setName(this.name).setDescription(this.description).setRequired(this.required);
		});
	}
}

export class CommandMentionableOption extends CommandOption implements ICommandMentionableOption {
	public constructor(name: string, description: string, required: boolean) {
		super(name, description, required, ApplicationCommandOptionType.String);
	}

	public override addToBuilder(builder: OptionsBuilder): OptionsBuilder {
		return builder.addRoleOption(option => {
			return option.setName(this.name).setDescription(this.description).setRequired(this.required);
		});
	}
}

export class CommandNumberOption extends CommandOption implements ICommandNumberOption {
	autocomplete?: boolean;
	choices?: APIApplicationCommandOptionChoice<number>[];
	minValue?: number;
	maxValue?: number;

	public constructor(name: string, description: string, required: boolean, autocomplete?: boolean, choices?: APIApplicationCommandOptionChoice<number>[], minLength?: number, maxLength?: number) {
		super(name, description, required, ApplicationCommandOptionType.String);

		this.autocomplete = autocomplete;
		this.choices = choices;
		this.minValue = minLength;
		this.maxValue = maxLength;
	}

	public override addToBuilder(builder: OptionsBuilder): OptionsBuilder {
		return builder.addNumberOption(option => {
			option.setName(this.name).setDescription(this.description).setRequired(this.required);

			if (this.autocomplete != null) option.setAutocomplete(this.autocomplete);
			if (this.choices != null) option.addChoices(...this.choices);
			if (this.minValue != null) option.setMinValue(this.minValue);
			if (this.maxValue != null) option.setMaxValue(this.maxValue);

			return option;
		});
	}
}

export class CommandAttachmentOption extends CommandOption implements ICommandAttachmentOption {
	public constructor(name: string, description: string, required: boolean) {
		super(name, description, required, ApplicationCommandOptionType.String);
	}

	public override addToBuilder(builder: OptionsBuilder): OptionsBuilder {
		return builder.addAttachmentOption(option => {
			return option.setName(this.name).setDescription(this.description).setRequired(this.required);
		});
	}
}