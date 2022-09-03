import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { forgotPassword } from "../requests";
import { validateEmail } from "../utils";

const ForgotPassword = () => {
	const [email, setEmail] = useState<string>("");
	const [disableButton, setDisableButton] = useState(false);
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const forgotPasswordFormSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!email) {
			toast.warn("Please validate e-mail field");
			return;
		}
		if (!validateEmail(email)) {
			toast.error("E-mail format incorrect");
			return;
		}

		setDisableButton(true);
		const data = await forgotPassword(email);
		if (data.success) {
			toast.success(data.message);
			setEmail("");
		} else {
			toast.error(data.message);
		}
		setDisableButton(false);
	};

	return (
		<section className="flex items-center justify-center center_screen min-h-screen p-4">
			<div className="py-4 px-4 max-w-xl w-full sm:px-6 shadow-lg shadow-gray-400 rounded-md">
				<h1>Forgot Password</h1>
				<form onSubmit={forgotPasswordFormSubmit}>
					<div className="input_container">
						<label htmlFor="email">Enter your e-mail</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Required"
							value={email}
							onChange={handleChange}
						/>
					</div>
					<button
						type="submit"
						className="primary_button w-full my-6"
						disabled={disableButton}
					>
						Submit
					</button>
				</form>
			</div>
		</section>
	);
};

export default ForgotPassword;
