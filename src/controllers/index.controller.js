class IndexController {
    indexRender(req, res) {
      return res.status(200).render("index", {});
    }
}

export const indexController = new IndexController();