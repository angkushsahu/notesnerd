import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser, updateUser } from "../requests";
import { IUpdateUserValues } from "../types";
import { validateEmail } from "../utils";

const UpdateUser = () => {
	const [values, setValues] = useState<IUpdateUserValues>({ name: "", email: "" });
	const navigate = useNavigate();

	const fetchUser = async () => {
		const data = await getUser();
		if (data.success) {
			setValues({ name: data?.user?.name, email: data?.user?.email });
		} else if (!data?.success) {
			navigate("/", { replace: true });
		}
	};

	useEffect(() => {
		fetchUser();
		// eslint-disable-next-line
	}, []);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const submitUpdatedUserInfo = async (e: FormEvent) => {
		e.preventDefault();

		if (!values.email || !values.name) {
			toast.warn("Please validate all the required fields");
			return;
		}
		if (!validateEmail(values.email)) {
			toast.error("E-mail format incorrect");
			return;
		}

		const data = await updateUser(values);
		if (data.success) {
			toast.success(data.message);
		} else {
			toast.error(data.message);
		}
	};

	return (
		<section className="flex items-center justify-center center_screen min-h-screen p-4">
			<div className="py-4 px-4 max-w-xl w-full sm:px-6 shadow-lg shadow-gray-400 rounded-md">
				<h1>Update User</h1>
				<form onSubmit={submitUpdatedUserInfo}>
					<div className="input_container">
						<label htmlFor="name">Enter your name</label>
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Required"
							value={values.name}
							onChange={handleChange}
						/>
					</div>
					<div className="input_container">
						<label htmlFor="email">Enter your e-mail</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Required"
							value={values.email}
							onChange={handleChange}
						/>
					</div>
					<button type="submit" className="primary_button w-full my-6">
						Update
					</button>
				</form>
			</div>
		</section>
	);
};

export default UpdateUser;
