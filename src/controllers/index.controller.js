import { logger } from "../utils/logger.js";

class IndexController {
    indexRender(req, res) {
      const user = req.session.user;
      return res.status(200).render("index", {user});
    }

    loginRender(req, res) {
      const user = req.session.user;
      return res.status(200).render("login", {user});
    }

    homeRender(req, res) {
      const user = req.session.user;
      const finesQuantity = req.session.user.fines.length
      return res.status(200).render("home", {user, finesQuantity});
    }

    carFineFormRender(req, res) {
      const user = req.session.user;
      return res.status(200).render("carFineForm", {user});
    }

    successRender(req, res) {
      const msg = "Redireccionando al panel de control de usuario en breve...";
      const user = req.session.user;
      return res.status(200).render("success", {msg, user});
    }
}

export const indexController = new IndexController();