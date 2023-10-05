import express from "express";
import { carFinesController } from "../controllers/carFines.controller.js";
import { checkLogin } from "../middlewares/auth.js";

export const carFinesRouter = express.Router();

carFinesRouter.get("/getAll", carFinesController.getAll);

carFinesRouter.get("/:id", carFinesController.findById);

carFinesRouter.post("/create", carFinesController.create);

carFinesRouter.delete("/:id", carFinesController.deleteOne);

carFinesRouter.post("/createAndRender", checkLogin, carFinesController.createAndRender)