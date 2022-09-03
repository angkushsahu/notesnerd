import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Header } from "../components";
import { createNote } from "../requests";
import { IUpdateNoteValues } from "../types";

const CreateNote = () => {
	const [note, setNote] = useState<IUpdateNoteValues>({
		title: "",
		description: "",
		important: "NO",
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setNote({ ...note, [name]: value });
	};

	const createNoteSubmission = async (e: FormEvent) => {
		e.preventDefault();

		if (!note.title || !note.description) {
			toast.warn("Please validate all the required fields");
			return;
		}

		const data = await createNote(note);
		if (data.success) {
			toast.success(data.message);
			setNote({
				title: "",
				description: "",
				important: "NO",
			});
		} else {
			toast.error(data.message);
		}
	};

	return (
		<section>
			<Header />
			<section className="flex items-center justify-center center_screen fill_screen p-4">
				<div className="py-4 px-4 max-w-xl w-full sm:px-6 shadow-lg shadow-gray-400 rounded-md">
					<h1>Create Note</h1>
					<form onSubmit={createNoteSubmission}>
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
								<option value="NO">NO</option>
								<option value="YES">YES</option>
							</select>
						</div>
						<button type="submit" className="primary_button w-full my-6">
							Create
						</button>
					</form>
				</div>
			</section>
		</section>
	);
};

export default CreateNote;
