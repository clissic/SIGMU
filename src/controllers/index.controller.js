import { CarFinesMongoose } from "../DAO/models/mongoose/carFines.mongoose.js";
import { carFinesServices } from "../services/carFines.service.js";
import { logger } from "../utils/logger.js";

class IndexController {
  async indexRender(req, res) {
    const user = req.session.user;
    return res.status(200).render("index", { user });
  }

  async homeRender(req, res) {
    const user = req.session.user;
    const finesQuantity = req.session.user.fines.length;
    return res.status(200).render("home", { user, finesQuantity });
  }

  async carFineFormRender(req, res) {
    const user = req.session.user;
    return res.status(200).render("carFineForm", { user });
  }

  async successRender(req, res) {
    const msg = "Redireccionando al panel de control de usuario en breve...";
    const user = req.session.user;
    return res.status(200).render("success", { msg, user });
  }

  async userFinesRender(req, res) {
    const user = req.session.user;
    const userFines = await carFinesServices.findByEmail(user.email)
    const filteredUserFines = userFines.map((fine) => {
      return {
        _id: fine._id,
        fine_number: fine.fine_number,
        fine_date: fine.fine_date,
        fine_time: fine.fine_time,
        fine_article: fine.fine_article,
        fine_amount: fine.fine_amount,
        fine_extra_amount: fine.fine_extra_amount,
        fine_author: fine.fine_author,
        fine_proves: fine.fine_proves,
        fine_status: fine.fine_status,
        car_brand: fine.car_brand,
        car_model: fine.car_model,
        car_reg_number: fine.car_reg_number,
        owner_ci: fine.owner_ci,
        owner_name: fine.owner_name,
        owner_tel: fine.owner_tel,
        owner_dir: fine.owner_dir,
      };
    });
    return res.status(200).render("userFines", { user, userFines: filteredUserFines })
  }

  async updatePassword(req, res) {
    const user = req.session.user;
    const email = req.session.user.email;
    return res.status(200).render("updatePasswordForm", { user, email })
  }
}

export const indexController = new IndexController();
