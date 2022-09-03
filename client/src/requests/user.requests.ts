import { IGetUser, IResponse, IUpdateUserValues } from "../types";
import API_URL from "./apiUrl";

export const getUser = async () => {
	const response = await fetch(`${API_URL}/user/`, {
		method: "GET",
		headers: { "Content-type": "application/json" },
		credentials: "include",
	});
	const data: IGetUser = await response.json();

	return data;
};

export const updateUser = async (values: IUpdateUserValues) => {
	const response = await fetch(`${API_URL}/user/update`, {
		method: "PUT",
		headers: { "Content-type": "application/json" },
		credentials: "include",
		body: JSON.stringify(values),
	});
	const data: IGetUser = await response.json();

	return data;
};

export const deleteUser = async () => {
	const response = await fetch(`${API_URL}/user/delete`, {
		method: "DELETE",
		headers: { "Content-type": "application/json" },
		credentials: "include",
	});
	const data: IResponse = await response.json();

	return data;
};
