import express from "express";
import { usersController } from "../controllers/users.controller.js";

export const usersRouter = express.Router();

usersRouter.post("/create", usersController.create);

usersRouter.get("/", usersController.getAll);

usersRouter.get("/:id", usersController.findById);