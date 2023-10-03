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
}

export const carFinesServices = new CarFinesService();