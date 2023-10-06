import { carFinesModel } from "../DAO/models/carFines.model.js";
import { logger } from "../utils/logger.js";

class CarFinesService {
  async getAll() {
    try {
      return await carFinesModel.getAll();
    } catch (e) {
      throw logger.error("Failed to get all car fines: " + e);
    }
  }

  async findById(id) {
    try {
      return await carFinesModel.findById(id);
    } catch (e) {
      throw logger.error("Failed to find car fine by ID: " + e);
    }
  }

  async findByNumber(fine_number) {
    try {
      return await carFinesModel.findByNumber(fine_number);
    } catch (e) {
      throw logger.error("Failed to find car fines by number: " + e);
    }
  }

  async create({
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
  }) {
    try {
      async function ordenarFecha(fecha) {
        const date = new Date(fecha);
        if (isNaN(date.getTime())) {
          return "Fecha inválida";
        }
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear() % 100).padStart(2, '0');
        const fechaFormateada = `${day}/${month}/${year}`;
        return fechaFormateada;
      }
        const allFines = await carFinesModel.getAll()
        async function getCarFineNumber() {
            if (allFines.length === 0) {
                return 1;
            } else {
                const lastFine = allFines[allFines.length - 1];
                return lastFine.fine_number !== undefined ? lastFine.fine_number + 1 : 1;
            }
        }
      const carFineCreated = await carFinesModel.create({
        fine_number: await getCarFineNumber(),
        fine_date: await ordenarFecha(fine_date),
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
      });
      await carFineCreated.save();
      return carFineCreated;
    } catch (e) {
      throw logger.error("Failed to create car fine: " + e);
    }
  }

  async deleteOne(id) {
    try {
        return await carFinesModel.deleteOne(id)
    } catch(e) {
        throw logger.error("Failed deleting car fine by ID: " + e)
    }
  }

  async findByEmail(email) {
    try {
      return await carFinesModel.findByEmail(email);
    } catch (e) {
      throw logger.error("Failed to get all car fines: " + e);
    }
  }
}

export const carFinesServices = new CarFinesService();