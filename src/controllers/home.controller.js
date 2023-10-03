class HomeController {
    homeRender(req, res) {
        const user = req.session
        return res.status(200).render("home", {user});
      }
}

export const homeController = new HomeController();