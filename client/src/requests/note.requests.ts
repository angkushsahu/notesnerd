import { IGetAllNotes, IGetOneNote, IResponse, IUpdateNoteValues } from "../types";
import API_URL from "./apiUrl";

export const createNote = async (values: IUpdateNoteValues) => {
	const important = values.important === "YES" ? true : false;
	const newNoteValues = { title: values.title, description: values.description, important };
	const response = await fetch(`${API_URL}/note/create`, {
		method: "POST",
		headers: { "Content-type": "application/json" },
		credentials: "include",
		body: JSON.stringify(newNoteValues),
	});
	const data: IGetOneNote = await response.json();

	return data;
};

export const getAllNotes = async () => {
	const response = await fetch(`${API_URL}/note/all`, {
		method: "GET",
		headers: { "Content-type": "application/json" },
		credentials: "include",
	});
	const data: IGetAllNotes = await response.json();

	return data;
};

export const getOneNote = async (id: string) => {
	const response = await fetch(`${API_URL}/note/${id}`, {
		method: "GET",
		headers: { "Content-type": "application/json" },
		credentials: "include",
	});
	const data: IGetOneNote = await response.json();

	return data;
};

export const updateNote = async (id: string, values: IUpdateNoteValues) => {
	const important = values.important === "YES" ? true : false;
	const updateValues = { title: values.title, description: values.description, important };
	const response = await fetch(`${API_URL}/note/update/${id}`, {
		method: "PUT",
		headers: { "Content-type": "application/json" },
		credentials: "include",
		body: JSON.stringify(updateValues),
	});
	const data: IGetOneNote = await response.json();

	return data;
};

export const deleteNote = async (id: string) => {
	const response = await fetch(`${API_URL}/note/delete/${id}`, {
		method: "DELETE",
		headers: { "Content-type": "application/json" },
		credentials: "include",
	});
	const data: IResponse = await response.json();

	return data;
};
