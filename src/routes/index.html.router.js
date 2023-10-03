import express from "express";
import { indexController } from "../controllers/index.controller.js";

export const indexRouter = express.Router();

indexRouter.get("/", indexController.indexRender);

indexRouter.get("/login", indexController.loginRender)

indexRouter.get("/home", indexController.homeRender)

indexRouter.get("/carFineForm", indexController.carFineFormRender)

/* indexRouter.get("/recover-form", indexController.recoverRender)

indexRouter.post("/recover-form", indexController.recoverPass)

indexRouter.get("/recover-password", indexController.recoverForm)

indexRouter.post("/recover-password", indexController.recoverByEmail) */