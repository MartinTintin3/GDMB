/* eslint-disable no-unused-vars */
import { CommandExternalData } from "..";

import { CommandOption } from "../option";

interface ICommand {
	name: string;
	description: string;
	defaultPermissions?: string | number | bigint;
	options: CommandOption[];

	execute: (data: CommandExternalData) => Promise<any>;
}

export default ICommand;