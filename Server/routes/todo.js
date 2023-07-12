import express from "express";

import { verifyUser } from "../middleware/auth.js";
import {
  createTodo,
  deleteTodo,
  doneTodo,
  getData,
  undoTodo,
  updateTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.route("/get").post(verifyUser, getData);

router.route("/create").post(verifyUser, createTodo);

router.route("/update").post(verifyUser, updateTodo);

router.route("/delete").post(verifyUser, deleteTodo);

router.route("/done").post(verifyUser, doneTodo);

router.route("/undo").post(verifyUser, undoTodo);

export default router;
