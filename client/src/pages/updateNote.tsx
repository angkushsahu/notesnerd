import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../components";
import { getOneNote, updateNote } from "../requests";
import { IUpdateNoteValues } from "../types";

const UpdateNote = () => {
	const { id } = useParams();
	const [note, setNote] = useState<IUpdateNoteValues>({
		title: "this is awesome",
		description: "Lorem ipsum dolor isit consectutor amet",
		important: "NO",
	});

	const fetchNote = async () => {
		if (!id) {
			return;
		}
		const data = await getOneNote(id);
		if (data.success) {
			setNote({
				title: data.note.title,
				description: data.note.description,
				important: data.note.important ? "YES" : "NO",
			});
		}
	};

	useEffect(() => {
		fetchNote();
		// eslint-disable-next-line
	}, [id]);

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setNote({ ...note, [name]: value });
	};

	const submitUpdatedNote = async (e: FormEvent) => {
		e.preventDefault();

		if (!note.title || !note.description) {
			toast.warn("Please validate all the required fields");
			return;
		}

		const data = await updateNote(id!, note);
		if (data.success) {
			toast.success(data.message);
		} else {
			toast.error(data.message);
		}
	};

	return (
		<section>
			<Header />
			<section className="flex items-center justify-center center_screen fill_screen p-4">
				<div className="py-4 px-4 max-w-xl w-full sm:px-6 shadow-lg shadow-gray-400 rounded-md">
					<h1>Update Note</h1>
					<form onSubmit={submitUpdatedNote}>
						<div className="input_container">
							<label htmlFor="title">Enter note title</label>
							<input
								type="text"
								name="title"
								id="title"
								placeholder="Required"
								value={note.title}
								onChange={handleChange}
							/>
						</div>
						<div className="input_container">
							<label htmlFor="description">Enter note description</label>
							<input
								type="text"
								name="description"
								id="description"
								placeholder="Required"
								value={note.description}
								onChange={handleChange}
							/>
						</div>
						<div className="input_container">
							<label htmlFor="description">Mark as important</label>
							<select
								name="important"
								id="important"
								value={note.important}
								onChange={handleChange}
							>
								<option value="false">NO</option>
								<option value="true">YES</option>
							</select>
						</div>
						<button type="submit" className="primary_button w-full my-6">
							Update
						</button>
					</form>
				</div>
			</section>
		</section>
	);
};

export default UpdateNote;
