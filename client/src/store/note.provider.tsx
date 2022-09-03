import { ReactNode, useContext, useState } from "react";
import { INote, IUser } from "../types";
import NoteContext from "./note.context";

const NoteProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState({} as IUser);
	const [note, setNote] = useState({} as INote);
	const [notes, setNotes] = useState([] as INote[]);
	const [importantNotes, setImportantNotes] = useState([] as INote[]);
	const [isAuth, setIsAuth] = useState(false);
	const [totalNotes, setTotalNotes] = useState(0);
	const [totalImportantNotes, setTotalImportantNotes] = useState(0);

	return (
		<NoteContext.Provider
			value={{
				user,
				setUser,
				note,
				setNote,
				notes,
				setNotes,
				importantNotes,
				setImportantNotes,
				isAuth,
				setIsAuth,
				setTotalImportantNotes,
				setTotalNotes,
				totalImportantNotes,
				totalNotes,
			}}
		>
			{children}
		</NoteContext.Provider>
	);
};

export const NoteState = () => {
	return useContext(NoteContext);
};

export default NoteProvider;
