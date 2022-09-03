import { Router } from "express";
import { createNote, deleteNote, getAllNotes, getNote, updateNote } from "../controllers";
import { isUserAuthenticated } from "../middlewares";
const router = Router();

router.route("/create").post(isUserAuthenticated, createNote);
router.route("/all").get(isUserAuthenticated, getAllNotes);
router.route("/:id").get(isUserAuthenticated, getNote);
router.route("/update/:id").put(isUserAuthenticated, updateNote);
router.route("/delete/:id").delete(isUserAuthenticated, deleteNote);

export default router;
