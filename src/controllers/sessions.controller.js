import { logger } from "../utils/logger.js";

class SessionsController {
  async signup(req, res) {
    if (!req.user) {
      return res.render("errorPage", { msg: "Something went wrong." });
    }
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      rank: req.user.rank,
      role: req.user.role,
    };
    return res.redirect("/");
  }

  async login(req, res) {
    try {
      if (!req.user) {
        return res.render("errorPage", {
          msg: "User email or password are incorrect.",
        });
      }
      req.session.user = {
        _id: req.user._id,
        avatar: req.user.avatar,
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        rank: req.user.rank,
        role: req.user.role,
        fines: req.user.fines,
      };
      return res.redirect("/index/home");
    } catch (err) {
      logger.info(err);
      return res
        .status(500)
        .render("errorPage", { msg: "Internal Server Error" });
    }
  }

  logout(req, res) {
    const user = req.session.user
    req.session.destroy((err) => {
      if (err) {
        return res.render("errorPage", { msg: "Logout error." });
      }
      logger.info(`${user.rank} ${user.first_name} ${user.last_name} logged out`);
      res.redirect("/");
    });
  }
}

export const sessionsController = new SessionsController();
