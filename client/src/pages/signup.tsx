import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { toast } from "react-toastify";
import { ISignupValues } from "../types";
import { validateEmail } from "../utils";
import { signup } from "../requests";
import { NoteState } from "../store";

const Signup = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
	const [values, setValues] = useState<ISignupValues>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const navigate = useNavigate();
	const { setIsAuth } = NoteState();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const signupFormSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!values.email || !values.password) {
			toast.warn("Please validate all the required fields");
			return;
		}
		if (!validateEmail(values.email)) {
			toast.error("E-mail format incorrect");
			return;
		}
		if (values.password !== values.confirmPassword) {
			toast.warn("Passwords fields are not matching");
			return;
		}

		const data = await signup(values);
		if (data.success) {
			setIsAuth(true);
			toast.success(data.message);
			navigate("/", { replace: true });
		} else {
			toast.error(data.message);
		}
	};

	return (
		<section className="flex items-center justify-center center_screen min-h-screen p-4">
			<div className="py-4 px-4 max-w-xl w-full sm:px-6 shadow-lg shadow-gray-400 rounded-md">
				<h1>Signup</h1>
				<form onSubmit={signupFormSubmit}>
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
					<div className="input_container">
						<label htmlFor="password">Enter your password</label>
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							id="password"
							placeholder="Required"
							value={values.password}
							onChange={handleChange}
						/>
						{showPassword ? (
							<BiHide
								className="cursor-pointer text-slate-500"
								onClick={() => setShowPassword(prev => !prev)}
								size={25}
							/>
						) : (
							<BiShow
								className="cursor-pointer text-slate-500"
								onClick={() => setShowPassword(prev => !prev)}
								size={25}
							/>
						)}
					</div>
					<div className="input_container">
						<label htmlFor="confirmPassword">Re-enter your password</label>
						<input
							type={showConfirmPassword ? "text" : "password"}
							name="confirmPassword"
							id="confirmPassword"
							placeholder="Required"
							value={values.confirmPassword}
							onChange={handleChange}
						/>
						{showConfirmPassword ? (
							<BiHide
								className="cursor-pointer text-slate-500"
								onClick={() => setShowConfirmPassword(prev => !prev)}
								size={25}
							/>
						) : (
							<BiShow
								className="cursor-pointer text-slate-500"
								onClick={() => setShowConfirmPassword(prev => !prev)}
								size={25}
							/>
						)}
					</div>
					<button type="submit" className="primary_button w-full my-6">
						Signup
					</button>
				</form>
				<div className="flex items-center justify-center">
					<Link to="/login" className="hover:underline">
						Already have an account
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Signup;
