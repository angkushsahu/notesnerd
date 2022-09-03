import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middlewares";
import { Note } from "../models";
import { ICreateNote } from "../types";
import { ErrorHandler } from "../utils";

export const createNote = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { title, description, important }: ICreateNote = req.body;

		if (!title || !description) {
			return next(new ErrorHandler("Please validate all the required fields", 400));
		}

		const userId = res.locals.user.id;
		if (!userId) {
			return next(new ErrorHandler("User not found", 404));
		}

		const note = await Note.create({ title, description, important, user: userId });
		if (!note) {
			return next(new ErrorHandler("Unable to create note", 500));
		}

		res.status(201).json({
			success: true,
			message: "Note created successfully",
			note: note.getNote(),
		});
	},
);

export const getNote = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;

	const note = await Note.findById(id);
	if (!note) {
		return next(new ErrorHandler("Note not found", 404));
	}

	res.status(200).json({
		success: true,
		message: "Note fetched successfully",
		note: note.getNote(),
	});
});

export const getAllNotes = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = res.locals.user.id;
		if (!userId) {
			return next(new ErrorHandler("User not found", 404));
		}

		const notes = await Note.find({ user: userId })
			.sort({ createdAt: "desc" })
			.select("title description important _id");
		const importantNotes = notes.filter(note => note.important);
		const totalNotes = notes.length;
		const totalImportantNotes = importantNotes.length;

		res.status(200).json({
			success: true,
			message: "Note fetched successfully",
			totalNotes,
			totalImportantNotes,
			notes,
			importantNotes,
		});
	},
);

export const updateNote = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { title, description, important }: ICreateNote = req.body;
		const { id } = req.params;

		if (!title || !description) {
			return next(new ErrorHandler("Please validate all the required fields", 400));
		}

		const userId = res.locals.user.id;
		if (!userId) {
			return next(new ErrorHandler("User not found", 404));
		}

		const note = await Note.findByIdAndUpdate(
			id,
			{ title, description, important },
			{ new: true },
		);
		if (!note) {
			return next(new ErrorHandler("Unable to update note", 500));
		}

		res.status(200).json({
			success: true,
			message: "Note updated successfully",
			note: note.getNote(),
		});
	},
);

export const deleteNote = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const note = await Note.findById(id);
		if (!note) {
			return next(new ErrorHandler("Note not found", 404));
		}

		await note.remove();

		res.status(200).json({ success: true, message: "Note deleted successfully" });
	},
);
