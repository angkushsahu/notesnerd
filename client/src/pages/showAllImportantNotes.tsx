import { TiWarning } from "react-icons/ti";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Header } from "../components";
import { useNavigate } from "react-router-dom";
import { NoteState } from "../store";
import { deleteNote, getAllNotes } from "../requests";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ShowAllImportantNotes = () => {
	const { importantNotes, setImportantNotes } = NoteState();
	const navigate = useNavigate();
	const goToUpdate = (id: string) => {
		navigate(`/note/update/${id}`);
	};

	const fetchAllNotes = async () => {
		const data = await getAllNotes();
		if (data.success) {
			setImportantNotes(data.importantNotes);
		} else {
			navigate("/", { replace: true });
		}
	};

	useEffect(() => {
		fetchAllNotes();
		// eslint-disable-next-line
	}, []);

	const deleteNoteFunctionality = async (id: string) => {
		const data = await deleteNote(id);
		if (data.success) {
			const updatedNotes = importantNotes.filter(note => note._id !== id);
			setImportantNotes(updatedNotes);
		} else {
			toast.error(data.message);
		}
	};

	return (
		<section>
			<Header />
			<h1 className="text-center p-4">Important Notes</h1>
			<section className="center_screen p-4 sm:p-8 flex gap-16 flex-wrap items-center justify-center">
				{!importantNotes.length ? (
					<h2 className="text-center">You don't have any important notes</h2>
				) : (
					importantNotes.map((note, idx) => (
						<div
							key={idx}
							className="p-4 max-w-md w-full rounded-lg shadow-lg shadow-gray-500"
						>
							{note.important ? <TiWarning size="40" className="mx-auto" /> : <></>}
							<h1 className="mt-2 text-center">{note.title}</h1>
							<p className="description mt-4 text-center">{note.description}</p>
							<div className="mt-8 flex items-center justify-end gap-4">
								<MdModeEdit
									size="25"
									className="cursor-pointer"
									onClick={() => goToUpdate(note._id)}
								/>
								<MdDelete
									size="25"
									className="cursor-pointer"
									onClick={() => deleteNoteFunctionality(note._id)}
								/>
							</div>
						</div>
					))
				)}
			</section>
		</section>
	);
};

export default ShowAllImportantNotes;
