import { createContext, Dispatch, SetStateAction } from "react";
import { INote, IUser } from "../types";

interface INoteContext {
	note: INote;
	setNote: Dispatch<SetStateAction<INote>>;
	totalNotes: number;
	setTotalNotes: Dispatch<SetStateAction<number>>;
	totalImportantNotes: number;
	setTotalImportantNotes: Dispatch<SetStateAction<number>>;
	notes: INote[];
	setNotes: Dispatch<SetStateAction<INote[]>>;
	importantNotes: INote[];
	setImportantNotes: Dispatch<SetStateAction<INote[]>>;
	user: IUser;
	setUser: Dispatch<SetStateAction<IUser>>;
	isAuth: boolean;
	setIsAuth: Dispatch<SetStateAction<boolean>>;
}

const NoteContext = createContext({} as INoteContext);

export default NoteContext;
