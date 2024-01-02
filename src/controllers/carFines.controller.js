import { CarFinesMongoose } from "../DAO/models/mongoose/carFines.mongoose.js";
import { carFinesServices } from "../services/carFines.service.js";
import { userService } from "../services/users.service.js";
import { logger } from "../utils/logger.js";
import CarFineDTO from "./DTO/carFine.dto.js";

class CarFinesController {
  async getAll(req, res) {
    try {
      const carFines = await carFinesServices.getAll();
      if (carFines) {
        return res.status(200).json({
          status: "success",
          msg: "All car fines found",
          payload: carFines,
        });
      } else {
        return res.status(404).json({
          status: "failed",
          msg: "Car fines not found",
          payload: [],
        });
      }
    } catch (e) {
      logger.error("Error on carFinesController.getAll: " + e);
      return res.status(500).json({
        status: "error",
        msg: "Server error",
        payload: [],
      });
      /* return res.status(500).render("errorPage", {msg: "Código 500. Error del servidor."}) */
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;
      const carFine = await carFinesServices.findById(id);
      if (carFine) {
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
    } catch (e) {
      logger.error("Error on carFinesController.findById: " + e);
      return res.status(500).json({
        status: "error",
        msg: "Server error",
        payload: [],
      });
    }
  }

  async create(req, res) {
    try {
      const fine_author = req.session.user.email;
      const {
        fine_date,
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
        owner_dir,
      } = req.body;
      const last_modified_by = "S/M";
      const carFineDTO = new CarFineDTO(
        fine_date,
        fine_time,
        fine_article,
        fine_amount,
        fine_extra_amount,
        fine_author,
        fine_proves,
        car_brand,
        car_model,
        car_reg_number,
        owner_ci,
        owner_name,
        owner_tel,
        owner_dir,
        last_modified_by,
      );
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
    } catch (e) {
      logger.error("Error on carFinesController.create: " + e);
      return res.status(500).json({
        status: "error",
        msg: "Server error",
        payload: [],
      });
    }
  }

  async createAndRender(req, res) {
    try {
      const fine_author = req.session.user.email;
      const last_modified_by = "S/M";
      const {
        fine_date,
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
        owner_dir,
      } = req.body;
      const carFineDTO = new CarFineDTO(
        fine_date,
        fine_time,
        fine_article,
        fine_amount,
        fine_extra_amount,
        fine_author,
        fine_proves,
        car_brand,
        car_model,
        car_reg_number,
        owner_ci,
        owner_name,
        owner_tel,
        owner_dir,
        last_modified_by,
      );
      const carFineCreated = await carFinesServices.create(carFineDTO);
      logger.info(`Car fine: ${JSON.stringify(carFineCreated)} created by ${fine_author}`);
      if (carFineCreated) {
        const user = req.session.user;
        user.fines.push(carFineCreated);
        req.session.save();
        const _id = req.session.user._id;
        const fines = req.session.user.fines;
        await userService.updateFines({ _id, fines });
        return res.status(201).render("success", {
          msg: `Multa N° ${carFineCreated.fine_number} creada correctamente.`,
        });
      } else {
        return res.status(400).json({
          status: "failed",
          msg: "Some properties are incorrect in carFinesController.createAndRender, please check",
          payload: {},
        });
      }
    } catch (e) {
      logger.error("Error on carFinesController.createAndRender: " + e);
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
    } catch (e) {
      logger.error("Error on carFinesController.deleteOne: " + e);
      return res.status(500).json({
        status: "error",
        msg: "Server error",
        payload: [],
      });
    }
  }

  async findByNumberAndRenderForUpdate(req, res) {
    try {
      const { fine_number } = req.query;
      const user = req.session.user;
      if (user.role !== "admin" && user.role !== "superAdmin" && user.role !== "contable") {
        res.status(200).render("updateCarFine", { user, msg: `Su rol "${user.role}" no cuenta con autorización para modificar multas vehiculares. Si entiende necesaria una modificación deberá solicitarla a un administrador o deberá solicitar un cambio de rol desde el panel de control del usuario.`})
      } else {
        const carFine = await carFinesServices.findByNumber(fine_number);
        if (carFine) {
          return res.status(200).render("updateCarFine", { msg: `MODIFICAR MULTA N°${carFine.fine_number}:`, user, carFine, fine_number: carFine.fine_number, fine_date: carFine.fine_date, fine_time: carFine.fine_time, fine_article: carFine.fine_article, fine_article: carFine.fine_article, fine_amount: carFine.fine_amount, fine_extra_amount: carFine.fine_extra_amount, fine_proves: carFine.fine_proves, fine_status: carFine.fine_status, car_brand: carFine.car_brand, car_model: carFine.car_model, car_reg_number: carFine.car_reg_number, owner_ci: carFine.owner_ci, owner_name: carFine.owner_name, owner_tel: carFine.owner_tel, owner_dir: carFine.owner_dir });
        } else {
          return res.status(200).render("updateCarFine", { user, msg: "Multa no encontrada. Verifique nuevamente la numeración y vuelva a intentarlo." });
        }
      }
    } catch (e) {
      logger.error("Error on carFinesController.findByNumberAndRenderForUpdates: " + e);
      return res.status(500).render("errorPage", { msg: "Error del servidor al actualizar la multa."});
    }
  }

  async findByNumberAndUpdate (req, res) {
    const user = req.session.user
    const { fine_number } = req.params;
    const updatedCarFine = req.query;
    updatedCarFine.last_modified_by = user.email;
    try {
      const carFine = await carFinesServices.findOneAndUpdate({fine_number: fine_number}, updatedCarFine);
      if (carFine) {
        logger.info(`Multa N° ${fine_number} actualizada con éxito por ${user.rank} ${user.first_name} ${user.last_name}: ${carFine}` );
        res.status(200).render("success", { msg: `Multa N°${fine_number} actualizada correctamente.`})
      } else {
        logger.info(`No se encontró la multa con el N° ${fine_number} por ${user.rank} ${user.first_name} ${user.last_name}.`);
        res.status(200).render("errorPage", { msg: `La multa N°${fine_number} no pudo ser actualizada por no encontrarse la multa.`})
      }
    } catch (error) {
      logger.error(`Error de servidor al actualizar la multa N° ${fine_number} por ${user.rank} ${user.first_name} ${user.last_name}:`, error);
      res.status(200).render("errorPage", { msg: `La multa N°${fine_number} no pudo ser actualizada por un error del servidor.`})
    }
  }

  async findByNumberAndRenderForDelete(req, res) {
    try {
      const { fine_number } = req.query;
      const user = req.session.user;
      if (user.role !== "admin" && user.role !== "superAdmin") {
        res.status(200).render("deleteCarFine", { user, msg: `Su rol "${user.role}" no cuenta con autorización para eliminar multas vehiculares. Si entiende necesaria la eliminación de una multa deberá solicitarla a un administrador o deberá solicitar un cambio de rol desde el panel de control del usuario.`})
      } else {
        const carFine = await carFinesServices.findByNumber(fine_number);
        if (carFine) {
          return res.status(200).render("deleteCarFine", { msg: `ELIMINAR MULTA N°${carFine.fine_number}:`, user, carFine, _id: carFine._id, fine_number: carFine.fine_number, fine_date: carFine.fine_date, fine_time: carFine.fine_time, fine_article: carFine.fine_article, fine_article: carFine.fine_article, fine_amount: carFine.fine_amount, fine_extra_amount: carFine.fine_extra_amount, fine_proves: carFine.fine_proves, fine_status: carFine.fine_status, fine_author: carFine.fine_author, car_brand: carFine.car_brand, car_model: carFine.car_model, car_reg_number: carFine.car_reg_number, owner_ci: carFine.owner_ci, owner_name: carFine.owner_name, owner_tel: carFine.owner_tel, owner_dir: carFine.owner_dir });
        } else {
          return res.status(200).render("deleteCarFine", { user, msg: "Multa no encontrada. Verifique nuevamente la numeración y vuelva a intentarlo." });
        }
      }
    } catch (e) {
      logger.error("Error on carFinesController.findByNumber: " + e);
      return res.status(500).json({
        status: "error",
        msg: "Server error",
        payload: [],
      });
    }
  }

  async findByNumberAndDelete (req, res) {
    const user = req.session.user
    const { fine_number } = req.params;
    try {
      const carFineDeleted = await carFinesServices.findOneAndDelete({fine_number: fine_number});
      if (carFineDeleted) {
        logger.info(`Multa N° ${fine_number} eliminada con éxito por ${user.rank} ${user.first_name} ${user.last_name} (${user.email}).` );
        res.status(200).render("success", { msg: `Multa N°${fine_number} eliminada correctamente.`})
      } else {
        logger.info(`No se encontró la multa con el N° ${fine_number} por ${user.rank} ${user.first_name} ${user.last_name}.`);
        res.status(200).render("errorPage", { msg: `La multa N°${fine_number} no pudo ser eliminada por no encontrarse la multa.`})
      }
    } catch (error) {
      logger.error(`Error de servidor al eliminar la multa N° ${fine_number} por ${user.rank} ${user.first_name} ${user.last_name}:`, error);
      res.status(200).render("errorPage", { msg: `La multa N°${fine_number} no pudo ser eliminada por un error del servidor.`})
    }
  }
}

export const carFinesController = new CarFinesController();
