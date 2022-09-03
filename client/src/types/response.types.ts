export interface INote {
	_id: string;
	title: string;
	description: string;
	important: boolean;
}

export interface IUser {
	_id: string;
	name: string;
	email: string;
}

export interface IResponse {
	success: boolean;
	message: string;
}

export interface IGetUser {
	success: boolean;
	message: string;
	user: IUser;
}

export interface IGetAllNotes {
	success: boolean;
	message: string;
	notes: INote[];
	importantNotes: INote[];
	totalNotes: number;
	totalImportantNotes: number;
}

export interface IGetOneNote {
	success: boolean;
	message: string;
	note: INote;
}
