export interface ILoginValues {
	email: string;
	password: string;
}

export interface ISignupValues {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface IResetPasswordValues {
	password: string;
	confirmPassword: string;
}

export interface IUpdateUserValues {
	name: string;
	email: string;
}

export interface INoteValues {
	title: string;
	description: string;
	important: boolean;
}

export interface IUpdateNoteValues {
	title: string;
	description: string;
	important: "YES" | "NO";
}
