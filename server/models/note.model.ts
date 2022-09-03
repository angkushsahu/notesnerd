import { Schema, model } from "mongoose";
import { INote } from "../types";

const noteSchema = new Schema(
	{
		title: { type: String, required: [true, "Please enter title for this note"], trim: true },
		description: {
			type: String,
			required: [true, "Please enter description for this note"],
			trim: true,
		},
		important: { type: Boolean, default: false },
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true },
);

noteSchema.methods.getNote = function () {
	return {
		title: this.title,
		description: this.description,
		important: this.important,
		_id: this._id,
	};
};

export default model<INote>("Note", noteSchema);
