import express from "express";
import { usersController } from "../controllers/users.controller.js";

export const usersRouter = express.Router();

usersRouter.post("/newAccount", usersController.sendNewAccEmail);

usersRouter.post("/create", usersController.create);

usersRouter.get("/", usersController.getAll);

usersRouter.get("/:id", usersController.findById);

usersRouter.post("/updatePasswordForm", usersController.updatePasswordAndRender);

usersRouter.post("/updateDataForm", usersController.updateDataAndRender);