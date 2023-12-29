import express from "express";
import { carFinesController } from "../controllers/carFines.controller.js";
import { checkLogin } from "../middlewares/auth.js";

export const carFinesRouter = express.Router();

carFinesRouter.get("/getAll", carFinesController.getAll);

carFinesRouter.get("/:id", carFinesController.findById);

carFinesRouter.post("/create", carFinesController.create);

carFinesRouter.delete("/:id", carFinesController.deleteOne);

carFinesRouter.post("/createAndRender", checkLogin, carFinesController.createAndRender);

carFinesRouter.get("/findBy/number/update", checkLogin, carFinesController.findByNumberAndRenderForUpdate);

carFinesRouter.get("/update/:fine_number", checkLogin, carFinesController.findByNumberAndUpdate);

carFinesRouter.get("/findBy/number/delete", checkLogin, carFinesController.findByNumberAndRenderForDelete);

carFinesRouter.get("/delete/:fine_number", checkLogin, carFinesController.findByNumberAndDelete);