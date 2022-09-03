import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middlewares";
import { User } from "../models";
import { IUpdateUser } from "../types";
import { ErrorHandler, validateEmail } from "../utils";

export const getUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
	const user = res.locals.user;
	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}

	res.status(200).json({
		success: true,
		message: "User found successfully",
		user: user.getUser(),
	});
});

export const updateUser = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = res.locals.user;
		if (!user) {
			return next(new ErrorHandler("User not found", 400));
		}
		const id = user.id;
		const { name, email }: IUpdateUser = req.body;
		if (!validateEmail(email)) {
			return next(new ErrorHandler("E-mail format is invalid", 400));
		}

		const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });
		res.status(200).json({
			success: true,
			message: "User account updated successfully",
			user: updatedUser?.getUser(),
		});
	},
);

export const deleteUser = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = await User.findById(res.locals.user.id);
		if (!user) {
			return next(new ErrorHandler("User not found", 404));
		}

		res.clearCookie("notesnerdToken");
		await user.remove();
		res.status(200).json({ success: true, message: "User account deleted successfully" });
	},
);
