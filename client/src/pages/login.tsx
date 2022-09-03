import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { toast } from "react-toastify";
import { ILoginValues } from "../types";
import { validateEmail } from "../utils";
import { login } from "../requests";
import { NoteState } from "../store";

const Login = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [values, setValues] = useState<ILoginValues>({ email: "", password: "" });
	const navigate = useNavigate();
	const { setIsAuth } = NoteState();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const loginFormSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!values.email || !values.password) {
			toast.warn("Please validate all the required fields");
			return;
		}
		if (!validateEmail(values.email)) {
			toast.error("E-mail format incorrect");
			return;
		}

		const data = await login(values);
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
				<h1>Login</h1>
				<form onSubmit={loginFormSubmit}>
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
					<button type="submit" className="primary_button w-full my-6">
						Login
					</button>
				</form>
				<div className="flex flex-col sm:flex-row items-center justify-between">
					<Link to="/signup" className="hover:underline">
						Don't have an account
					</Link>
					<Link to="/forgot-password" className="hover:underline">
						Forgot password
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Login;
