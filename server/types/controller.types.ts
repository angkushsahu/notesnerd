export interface IReturnUser {
	name: string;
	email: string;
	_id: string;
}

export interface IReturnNote {
	title: string;
	description: string;
	important: boolean;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface ISignup {
	name: string;
	email: string;
	password: string;
}

export interface IUpdateUser {
	name: string;
	email: string;
}

export interface ICreateNote {
	title: string;
	description: string;
	important: boolean;
}
