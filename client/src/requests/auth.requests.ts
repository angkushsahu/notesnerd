import { IGetUser, ILoginValues, IResponse, ISignupValues } from "../types";
import API_URL from "./apiUrl";

export const signup = async (values: ISignupValues) => {
	const response = await fetch(`${API_URL}/auth/signup`, {
		method: "POST",
		headers: { "Content-type": "application/json" },
		credentials: "include",
		body: JSON.stringify(values),
	});
	const data: IGetUser = await response.json();

	return data;
};

export const login = async (values: ILoginValues) => {
	const response = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: { "Content-type": "application/json" },
		credentials: "include",
		body: JSON.stringify(values),
	});
	const data: IGetUser = await response.json();

	return data;
};

export const forgotPassword = async (email: string) => {
	const response = await fetch(`${API_URL}/auth/forgot-password`, {
		method: "POST",
		headers: { "Content-type": "application/json" },
		credentials: "include",
		body: JSON.stringify({ email }),
	});
	const data: IResponse = await response.json();

	return data;
};

export const resetPassword = async (id: string, password: string) => {
	const response = await fetch(`${API_URL}/auth/reset-password/${id}`, {
		method: "POST",
		headers: { "Content-type": "application/json" },
		credentials: "include",
		body: JSON.stringify({ password }),
	});
	const data: IResponse = await response.json();

	return data;
};

export const logout = async () => {
	const response = await fetch(`${API_URL}/auth/logout`, {
		method: "GET",
		headers: { "Content-type": "application/json" },
		credentials: "include",
	});
	const data: IResponse = await response.json();

	return data;
};
