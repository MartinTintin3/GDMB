import { DataType, Sequelize } from "sequelize-typescript";
import { DataTypes } from "sequelize/types";
import config from "../config.json" assert { type: "json" };

const sequelize = new Sequelize("database", "user", config.databasePassword, {
	host: "localhost",
	dialect: "sqlite",
	logging: true,
	storage: "database.sqlite",
});

export const Case = sequelize.define("Case", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	type: {
		type: DataType.ENUM,
		values: ["Warning", "TempMute", "PermMute", "TempBan", "PermBan", "Kick"],
		unique: false,
	},
}, { timestamps: true, createdAt: "timestamp" });

export const Warning = sequelize.define("Warning", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		references: {
			model: Case,
			key: "id",
		},
	},
	offender: {
		type: DataTypes.STRING,
		unique: false,
	},
	reason: {
		type: DataTypes.STRING,
		unique: false,
		allowNull: true,
	},
	moderator: {
		type: DataTypes.STRING,
		unique: false,
	},
}, { timestamps: true, createdAt: "timestamp" });

export const PermMute = sequelize.define("PermMute", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		references: {
			model: Case,
			key: "id",
		},
	},
	offender: {
		type: DataTypes.STRING,
		unique: false,
	},
	reason: {
		type: DataTypes.STRING,
		unique: false,
		allowNull: true,
	},
	moderator: {
		type: DataTypes.STRING,
		unique: false,
	},
}, { timestamps: true, createdAt: "timestamp" });

export const TempMute = sequelize.define("TempMute", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		references: {
			model: Case,
			key: "id",
		},
	},
	offender: {
		type: DataTypes.STRING,
		unique: false,
	},
	length: {
		type: DataTypes.INTEGER.UNSIGNED,
		unique: false,
	},
	reason: {
		type: DataTypes.STRING,
		unique: false,
		allowNull: true,
	},
	moderator: {
		type: DataTypes.STRING,
		unique: false,
	},
}, { timestamps: true, createdAt: "timestamp" });

export const PermBan = sequelize.define("PermBan", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		references: {
			model: Case,
			key: "id",
		},
	},
	offender: {
		type: DataTypes.STRING,
		unique: false,
	},
	reason: {
		type: DataTypes.STRING,
		unique: false,
		allowNull: true,
	},
	moderator: {
		type: DataTypes.STRING,
		unique: false,
	},
}, { timestamps: true, createdAt: "timestamp" });

export const TempBan = sequelize.define("TempBan", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		references: {
			model: Case,
			key: "id",
		},
	},
	offender: {
		type: DataTypes.STRING,
		unique: false,
	},
	length: {
		type: DataTypes.INTEGER,
		unique: false,
	},
	reason: {
		type: DataTypes.STRING,
		unique: false,
		allowNull: true,
	},
	moderator: {
		type: DataTypes.STRING,
		unique: false,
	},
}, { timestamps: true, createdAt: "timestamp" });