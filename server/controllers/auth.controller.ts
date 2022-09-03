import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { catchAsyncErrors } from "../middlewares";
import { User } from "../models";
import { ILogin, ISignup } from "../types";
import { ErrorHandler, sendResetEmail, sendToken, validateEmail } from "../utils";

export const signup = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
	const { name, email, password }: ISignup = req.body;

	if (!name || !email || !password) {
		return next(new ErrorHandler("Please validate all the fields", 400));
	}
	if (!validateEmail(email)) {
		return next(new ErrorHandler("Email format is incorrect", 400));
	}

	const user = await User.findOne({ email });
	if (user) {
		return next(new ErrorHandler("User account already exists", 400));
	}

	const newUser = await User.create({
		name,
		email,
		password,
	});
	if (!newUser) {
		return next(new ErrorHandler("Unable to create user", 500));
	}

	sendToken(res, newUser, 201, "User created successfully");
});

export const login = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password }: ILogin = req.body;
	if (!email || !password) {
		return next(new ErrorHandler("Please validate all the fields", 400));
	}
	if (!validateEmail(email)) {
		return next(new ErrorHandler("Email format is incorrect", 400));
	}

	const user = await User.findOne({ email });
	if (!user) {
		return next(new ErrorHandler("Enter valid credentials", 400));
	}

	const comparePasswordResult: boolean = await user.comparePassword(password);
	if (!comparePasswordResult) {
		return next(new ErrorHandler("Enter valid credentials", 400));
	}

	sendToken(res, user, 200, "User logged-in successfully");
});

export const logout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
	res.clearCookie("notesnerdToken");
	res.status(200).json({ success: true, message: "User logged out successfully" });
});

export const forgotPassword = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email }: { email: string } = req.body;
		if (!validateEmail(email)) {
			return next(new ErrorHandler("Please enter a valid e-mail ID", 400));
		}

		const user = await User.findOne({ email });
		if (!user) {
			return next(
				new ErrorHandler("User with this e-mail ID is not present in our database", 404),
			);
		}

		const resetToken: string = user.getResetPasswordToken();
		const { success, message } = await sendResetEmail(email, resetToken); // sending mail to the client
		if (!success) {
			return next(new ErrorHandler(message, 500));
		}
		await user.save();

		res.status(200).json({
			success: true,
			message: `Password reset link has been sent to ${email}, please check your e-mail`,
		});
	},
);

export const resetPassword = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { password }: { password: string } = req.body;
		const { id } = req.params;
		const newId = crypto.createHash("sha256").update(id).digest("hex");
		const user = await User.findOne({ resetPassword: newId });
		if (!user) {
			return next(new ErrorHandler("User not found", 404));
		}

		user.password = password;
		user.resetPassword = "";
		await user.save();

		res.status(200).json({ success: true, message: "New password updated" });
	},
);
