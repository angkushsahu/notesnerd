import { Document, Schema } from "mongoose";
import { IReturnNote, IReturnUser } from "./controller.types";

export interface IUser extends Document {
	_id: Schema.Types.ObjectId;
	name: string;
	email: string;
	password: string;
	pic: string;
	publicUrl: string;
	role: "user" | "admin";
	resetPassword: string;
	getUser(): IReturnUser;
	comparePassword(enteredPassword: string): Promise<boolean>;
	getJWTToken(): string;
	getResetPasswordToken(): string;
}

export interface INote {
	_id: Schema.Types.ObjectId;
	user: Schema.Types.ObjectId;
	title: string;
	description: string;
	important: boolean;
	getNote(): IReturnNote;
}
