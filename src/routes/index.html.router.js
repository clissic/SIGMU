import express from "express";
import { indexController } from "../controllers/index.controller.js";
import { checkLogin } from "../middlewares/auth.js";

export const indexRouter = express.Router();

indexRouter.get("/index", checkLogin, indexController.indexRender);

indexRouter.get("/home", checkLogin, indexController.homeRender);

indexRouter.get("/carFinesMenu", checkLogin, indexController.carFinesMenuRender);

indexRouter.get("/carFineForm", checkLogin, indexController.carFineFormRender);

indexRouter.get("/allCarFines", checkLogin, indexController.paginateCarFines);

indexRouter.get("/updateCarFine", checkLogin, indexController.updateCarFineRender);

indexRouter.get("/deleteCarFine", checkLogin, indexController.deleteCarFineRender);

indexRouter.get("/success", checkLogin, indexController.successRender);

indexRouter.get("/userFines", checkLogin, indexController.userFinesRender);

indexRouter.get("/updatePasswordForm", checkLogin, indexController.updatePassword);

indexRouter.get("/updateDataForm", checkLogin, indexController.updateDataForm);

indexRouter.get("/shipFinesMenu", checkLogin, indexController.shipFinesMenuRender);

indexRouter.get("/usersMenu", checkLogin, indexController.usersMenuRender);

indexRouter.get("/toolsMenu", checkLogin, indexController.toolsMenuRender);

indexRouter.get("/ais", checkLogin, indexController.aisToolRender);

indexRouter.get("/weather", checkLogin, indexController.weatherToolRender);

indexRouter.get("/cameras", checkLogin, indexController.camerasToolRender);

indexRouter.get("/arrives", checkLogin, indexController.arrivesToolRender);

// GESTION DE USUARIOS

indexRouter.get("/users/new", checkLogin, indexController.createUserRender);

indexRouter.get("/users/allUsers", checkLogin, indexController.paginateUsers);

indexRouter.get("/users/updateUser", checkLogin, indexController.updateUser);