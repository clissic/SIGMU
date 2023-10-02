class IndexController {
    indexRender(req, res) {
      return res.status(200).render("index", {});
    }

    loginRender(req, res) {
      return res.status(200).render("login", {});
    }

    homeRender(req, res) {
      const user = req.session
      return res.status(200).render("home", {user});
    }
}

export const indexController = new IndexController();