import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { toast } from "react-toastify";
import { IResetPasswordValues } from "../types";
import { resetPassword } from "../requests";

const ResetPassword = () => {
	const { id } = useParams();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
	const [values, setValues] = useState<IResetPasswordValues>({
		password: "",
		confirmPassword: "",
	});
	const navigate = useNavigate();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const resetPasswordFormSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!values.confirmPassword || !values.password) {
			toast.warn("Please validate all the required fields");
			return;
		}
		if (values.password !== values.confirmPassword) {
			toast.warn("Passwords fields are not matching");
			return;
		}

		const data = await resetPassword(id!, values.password);
		if (data.success) {
			toast.success(data.message);
			navigate("/login", { replace: true });
		} else {
			toast.error(data.message);
		}
	};

	return (
		<section className="flex items-center justify-center center_screen min-h-screen p-4">
			<div className="py-4 px-4 max-w-xl w-full sm:px-6 shadow-lg shadow-gray-400 rounded-md">
				<h1>Reset Password</h1>
				<form onSubmit={resetPasswordFormSubmit}>
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
						Update
					</button>
				</form>
			</div>
		</section>
	);
};

export default ResetPassword;
