import { logger } from "../utils/logger.js";

export function checkLogin(req, res, next) {
    const user = req.session.user
  if (user) {
    return next();
  } else {
    logger.info("You are not logged");
    return res.redirect("/");
  }
}

export function alreadyLogged(req, res, next) {
  const user = req.session.user;
  if (user) {
    res.redirect("/index/home")
  } else {
    return next();
  }
}

export function checkAdmin(req, res, next) {
  const user = req.session.user;
  if (user.role !== "admin" && user.role !== "superAdmin") {
    res.status(401).render("errorPage", { msg: `Para realizar la presente acción usted debe ser un ADMINISTRADOR del sistema. Su rol actual es ${user.role}. Si considera que la acción es necesaria, póngase en contacto con un administrador o solicite un cambio de rol en el menú de usuarios.` })
  } else {
    return next();
  }
}
