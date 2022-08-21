import { CaseType } from "../db/models/Case";

export interface ICase {
	id: number;
	type: CaseType;
	offender: string;
	reason: string;
	moderator: string;
	timestamp: Date;
}

export interface IWarning {
	id: number;
	offender: string;
	reason: string | null;
	moderator: string;
	timestamp: Date;
}