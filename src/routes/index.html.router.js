import express from "express";
import { indexController } from "../controllers/index.controller.js";
import { alreadyLogged, checkLogin } from "../middlewares/auth.js";

export const indexRouter = express.Router();

indexRouter.get("/index", checkLogin, indexController.indexRender);

indexRouter.get("/", alreadyLogged, indexController.loginRender)

indexRouter.get("/home", checkLogin, indexController.homeRender)

indexRouter.get("/carFineForm", checkLogin, indexController.carFineFormRender)

indexRouter.get("/success", checkLogin, indexController.successRender)

/* indexRouter.get("/recover-form", indexController.recoverRender)

indexRouter.post("/recover-form", indexController.recoverPass)

indexRouter.get("/recover-password", indexController.recoverForm)

indexRouter.post("/recover-password", indexController.recoverByEmail) */