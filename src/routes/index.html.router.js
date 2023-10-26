import express from "express";
import { indexController } from "../controllers/index.controller.js";
import { checkLogin } from "../middlewares/auth.js";

export const indexRouter = express.Router();

indexRouter.get("/index", checkLogin, indexController.indexRender);

indexRouter.get("/home", checkLogin, indexController.homeRender);

indexRouter.get("/carFineForm", checkLogin, indexController.carFineFormRender);

indexRouter.get("/success", checkLogin, indexController.successRender);

indexRouter.get("/userFines", checkLogin, indexController.userFinesRender);

indexRouter.get("/updatePasswordForm", checkLogin, indexController.updatePassword);