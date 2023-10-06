import { carFinesServices } from "../services/carFines.service.js"
import { userService } from "../services/users.service.js";
import { logger } from "../utils/logger.js";
import CarFineDTO from "./DTO/carFine.dto.js";

class CarFinesController {
    async getAll(req, res) {
        try {
            const carFines = await carFinesServices.getAll()
            if (carFines) {
                return res.status(200).json({
                    status: "success",
                    msg: "All car fines found",
                    payload: carFines,
                })
            } else {
                return res.status(404).json({
                    status: "failed",
                    msg: "Car fines not found",
                    payload: [],
                })
            }
        } catch(e) {
            logger.error("Error on carFinesController.getAll: " + e)
            return res.status(500).json({
                status: "error",
                msg: "Server error",
                payload: [],
            })
            /* return res.status(500).render("errorPage", {msg: "Código 500. Error del servidor."}) */
        }
    }

    async findById(req, res) {
        try {
            const {id} = req.params;
            const carFine = await carFinesServices.findById(id);
            if(user) {
                return res.status(200).json({
                    status: "success",
                    msg: "Car fine found by ID",
                    payload: carFine,
                });
            } else {
                return res.status(404).json({
                    status: "failed",
                    msg: "Car fine not found by ID",
                    payload: [],
                });
            }
        } catch(e) {
            logger.error("Error on carFinesController.findById: " + e)
            return res.status(500).json({
                status: "error",
                msg: "Server error",
                payload: [],
            });
        }
    }

    async create(req, res) {
        try {
            const fine_author = req.session.user.email
            const {fine_date,
                fine_time,
                fine_article,
                fine_amount,
                fine_extra_amount,
                fine_proves,
                car_brand,
                car_model,
                car_reg_number,
                owner_ci,
                owner_name,
                owner_tel,
                owner_dir} = req.body;
            const carFineDTO = new CarFineDTO(fine_date, fine_time, fine_article, fine_amount, fine_extra_amount, fine_author, fine_proves, car_brand, car_model, car_reg_number, owner_ci, owner_name, owner_tel, owner_dir);
            const carFineCreated = await carFinesServices.create(carFineDTO);
            if (carFineCreated) {
                return res.status(201).json({
                    status: "success",
                    msg: "Car fine created",
                    payload: carFineCreated,
                });
            } else {
                return res.status(400).json({
                    status: "failed",
                    msg: "Some properties are incorrect in carFinesController.create, please check",
                    payload: {},
                });
            }
        } catch(e) {
            logger.error("Error on carFinesController.create: " + e)
            return res.status(500).json({
                status: "error",
                msg: "Server error",
                payload: [],
            });
        }
    }

    async createAndRender(req, res) {
        try {
            const fine_author = req.session.user.email
            const {fine_date,
                fine_time,
                fine_article,
                fine_amount,
                fine_extra_amount,
                fine_proves,
                car_brand,
                car_model,
                car_reg_number,
                owner_ci,
                owner_name,
                owner_tel,
                owner_dir} = req.body;
            const carFineDTO = new CarFineDTO(fine_date, fine_time, fine_article, fine_amount, fine_extra_amount, fine_author, fine_proves, car_brand, car_model, car_reg_number, owner_ci, owner_name, owner_tel, owner_dir);
            const carFineCreated = await carFinesServices.create(carFineDTO);
            if (carFineCreated) {
                const user = req.session.user
                user.fines.push(carFineCreated)
                req.session.save();
                const _id = req.session.user._id;
                const fines = req.session.user.fines
                await userService.updateFines({_id, fines})
                return res.status(201).redirect("/success");
            } else {
                return res.status(400).json({
                    status: "failed",
                    msg: "Some properties are incorrect in carFinesController.create, please check",
                    payload: {},
                });
            }
        } catch(e) {
            logger.error("Error on carFinesController.create: " + e)
            return res.status(500).json({
                status: "error",
                msg: "Server error",
                payload: {},
            });
        }
    }

    async deleteOne(req, res) {
        try {
            const { id } = req.params;
            const carFineDeleted = await carFinesServices.deleteOne(id);
            if (carFineDeleted) {
                return res.status(200).json({
                    status: "success",
                    msg: "Car fine deleted",
                    payload: carFineDeleted,
                });
            } else {
                return res.status(404).json({
                    status: "failed",
                    msg: "Car fine to delete not found",
                    payload: {},
                });
            }
        } catch(e) {
            logger.error("Error on carFinesController.deleteOne: " + e)
            return res.status(500).json({
                status: "error",
                msg: "Server error",
                payload: [],
            });
        }
    }
}

export const carFinesController = new CarFinesController();