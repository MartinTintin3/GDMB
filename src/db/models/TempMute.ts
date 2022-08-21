/*import { DataTypes, Model, Sequelize } from "sequelize";
import { ITempMute } from "../../interfaces/actions";

import { Case } from "./Case";

export class TempMute extends Model implements ITempMute {
	declare public id: number;
	declare public offender: string;
	declare public reason: string | null;
	declare public moderator: string;
	declare public timestamp: Date;
}

export const init = (sequelize: Sequelize, Cases: typeof Case) => {
	const Warnings = Warning.init({
		offender: {
			type: DataTypes.STRING,
			unique: false,
			allowNull: false,
		},
		reason: {
			type: DataTypes.TEXT,
			unique: false,
			allowNull: true,
		},
		moderator: {
			type: DataTypes.STRING,
			unique: false,
			allowNull: false,
		},
	}, { sequelize, timestamps: true, createdAt: "timestamp" });

	Cases.hasOne(Warnings);
	Warnings.belongsTo(Cases);

	return Warnings;
};*/