import { CarFinesMongoose } from "./mongoose/carFines.mongoose.js";

async function getNextFineNumber() {
  const highestFine = await CarFinesMongoose.findOne().sort("-fine_number");
  if (highestFine) {
    return highestFine.fine_number + 1;
  } else {
    return 1;
  }
}

export default class CarFinesModel {
  async getAll() {
    const carFines = await CarFinesMongoose.find(
      {},
      {
        _id: true,
        fine_number: true,
        fine_date: true,
        fine_time: true,
        fine_article: true,
        fine_amount: true,
        fine_extra_amount: true,
        fine_author: true,
        fine_proves: true,
        car_brand: true,
        car_model: true,
        car_reg_number: true,
        owner_ci: true,
        owner_name: true,
        owner_tel: true,
        owner_dir: true,
      }
    );
    return carFines;
  }

  async findById(id) {
    const carFine = await CarFinesMongoose.findById(id);
    return carFine;
  }

  async findByNumber(fine_number) {
    const numberFines = await CarFinesMongoose.find(
      { fine_number: fine_number },
      {
        _id: true,
        fine_number: true,
        fine_date: true,
        fine_time: true,
        fine_article: true,
        fine_amount: true,
        fine_extra_amount: true,
        fine_author: true,
        fine_proves: true,
        car_brand: true,
        car_model: true,
        car_reg_number: true,
        owner_ci: true,
        owner_name: true,
        owner_tel: true,
        owner_dir: true,
      }
    );
    return numberFines;
  }

  async create({
    fine_number,
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
    const carFineCreated = await CarFinesMongoose.create({
      fine_number,
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
  }
}
