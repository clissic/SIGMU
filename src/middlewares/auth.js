import { logger } from "../utils/logger.js";

export function checkLogin(req, res, next) {
    const user = req.session.user
  if (user) {
    logger.info(`${user.rank} ${user.first_name} ${user.last_name} is logged`);
    return next();
  } else {
    logger.info("You are not logged");
    return res.redirect("/");
  }
}

export function alreadyLogged(req, res, next) {
  const user = req.session.user;
  if (user) {
    res.redirect("/home")
  } else {
    return next();
  }
}
