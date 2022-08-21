import { DataTypes, Model, Sequelize } from "sequelize";
import { ICase } from "../../interfaces/actions";

/* eslint-disable no-shadow, no-unused-vars */
export enum CaseType {
	Warning = "Warning",
	Kick = "Kick",
	TempMute = "TempMute",
	PermMute = "PermMute",
	TempBan = "TempBan",
	PermBan = "PermBan",
}
/* eslint-enable no-shadow, no-unused-vars */

export class Case extends Model implements ICase {
	declare public id: number;
	declare public type: CaseType;
	declare public offender: string;
	declare public reason: string;
	declare public moderator: string;
	declare public timestamp: Date;
}

export const init = (sequelize: Sequelize) => {
	return Case.init({
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		type: {
			type: DataTypes.ENUM,
			values: Object.keys(CaseType),
			allowNull: false,
		},
		offender: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		reason: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		moderator: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, { sequelize, timestamps: true, createdAt: "timestamp" });
};