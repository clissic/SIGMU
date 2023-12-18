import express from "express";
import { indexController } from "../controllers/index.controller.js";
import { checkLogin } from "../middlewares/auth.js";

export const indexRouter = express.Router();

indexRouter.get("/index", checkLogin, indexController.indexRender);

indexRouter.get("/home", checkLogin, indexController.homeRender);

indexRouter.get("/carFineForm", checkLogin, indexController.carFineFormRender);

indexRouter.get("/allCarFines", checkLogin, indexController.paginateCarFines);

indexRouter.get("/success", checkLogin, indexController.successRender);

indexRouter.get("/userFines", checkLogin, indexController.userFinesRender);

indexRouter.get("/updatePasswordForm", checkLogin, indexController.updatePassword);

indexRouter.get("/updateDataForm", checkLogin, indexController.updateDataForm);

indexRouter.get("/carFinesMenu", checkLogin, indexController.carFinesMenuRender);

indexRouter.get("/shipFinesMenu", checkLogin, indexController.shipFinesMenuRender);

indexRouter.get("/usersMenu", checkLogin, indexController.usersMenuRender);

indexRouter.get("/toolsMenu", checkLogin, indexController.toolsMenuRender);

indexRouter.get("/AIS", checkLogin, indexController.aisToolRender);

indexRouter.get("/weather", checkLogin, indexController.weatherToolRender);