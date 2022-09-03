import { IUser } from "./model.types";

export interface IDecodedToken {
	id: string;
	user: IUser;
	iat: number;
	exp: number;
}
