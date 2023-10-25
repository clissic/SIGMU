import express from "express";
import { loginController } from "../controllers/login.controller.js";
import { alreadyLogged } from "../middlewares/auth.js";

export const loginRouter = express.Router();

loginRouter.get("/", alreadyLogged, loginController.loginRender);

loginRouter.get("/newAccount", alreadyLogged, loginController.newAccountRender);

loginRouter.get("/forgotPassword", alreadyLogged, loginController.forgotPasswordRender);

loginRouter.get("/passportFailure", alreadyLogged, loginController.passportFailure)