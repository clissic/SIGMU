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
    return res.redirect("/login");
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
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        rank: req.user.rank,
        role: req.user.role,
      };
      return res.redirect("/home");
    } catch (err) {
      logger.info(err);
      return res
        .status(500)
        .render("errorPage", { msg: "Internal Server Error" });
    }
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.render("errorPage", { msg: "Logout error." });
      }
      res.redirect("/");
    });
  }

  githubCallback(req, res) {
    req.session.email = req.user.email;
    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.age = req.user.age;
    req.session.role = req.user.role;
    req.session.avatar = req.user.avatar;
    req.session.cartId = req.user.cartId;
    res.redirect("/products");
  }
}

export const sessionsController = new SessionsController();
