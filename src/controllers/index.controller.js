import { CarFinesMongoose } from "../DAO/models/mongoose/carFines.mongoose.js";
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
    const userFines = req.session.user.fines
    return res.status(200).render("userFines", { user, userFines })
  }
}

export const indexController = new IndexController();
