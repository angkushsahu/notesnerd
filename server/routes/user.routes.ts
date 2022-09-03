import { Router } from "express";
import { getUser, updateUser, deleteUser } from "../controllers";
import { isUserAuthenticated } from "../middlewares";
const router = Router();

router.route("/").get(isUserAuthenticated, getUser);
router.route("/update").put(isUserAuthenticated, updateUser);
router.route("/delete").delete(isUserAuthenticated, deleteUser);

export default router;
