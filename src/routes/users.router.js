import express from "express";
import { usersController } from "../controllers/users.controller.js";
import { checkLogin } from "../middlewares/auth.js";

export const usersRouter = express.Router();

usersRouter.post("/newAccount", usersController.sendNewAccEmail);

usersRouter.post("/create", usersController.create);

usersRouter.post("/createAndSendEmail", usersController.createAndSendEmail);

usersRouter.get("/", usersController.getAll);

usersRouter.get("/:id", usersController.findById);

usersRouter.post("/updatePasswordForm", usersController.updatePasswordAndRender);

usersRouter.post("/updateDataForm", usersController.updateDataAndRender);

usersRouter.get("/update/userUpdate", checkLogin, usersController.findByIdAndRenderForUpdate);

usersRouter.get("/updateUser/:id", checkLogin, usersController.findByIdAndUpdate);

usersRouter.get("/findBy/id/delete", checkLogin, usersController.findByIdAndRenderForDelete);

usersRouter.get("/delete/:id", checkLogin, usersController.findByIdAndDelete);