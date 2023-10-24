class LoginController {
  async loginRender(req, res) {
    const user = req.session.user;
    return res.status(200).render("login", { user });
  }

  async newAccountRender(req, res) {
    return res.status(200).render("newAccountForm", {});
  }

  async forgotPasswordRender(req, res) {
    return res.status(200).render("forgotPasswordForm", {});
  }
}

export const loginController = new LoginController();