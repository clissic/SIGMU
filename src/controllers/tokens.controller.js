import { recoverTokensService } from "../services/tokens.service.js";
import { logger } from "../utils/logger.js";

class TokensController {
  async recoverPass(req, res) {
    const { email, newPassword, confirmPassword } = req.body;
    try {
      if (newPassword === confirmPassword) {
        await recoverTokensService.recoverPass(email, newPassword);
        res.render("login", { msg: "Contraseña actualizada correctamente" });
      } else {
        res.render("newPasswordForm", {
          email,
          msg: "Your new password must match with the confirmation password.",
        });
      }
    } catch (error) {
      logger.error("Error recovering password in tokens.controller: " + error);
      res.render("errorPage", {
        msg: "Error actualizando la contraseña.",
      });
    }
  }

  async recoverForm(req, res) {
    const { token, email } = req.query;
    const foundToken = await recoverTokensService.findOne({ token, email });
    try {
      if (foundToken && foundToken.expire > Date.now()) {
        await recoverTokensService.findOne(token, email);
        res.render("newPasswordForm", { email: email });
      } else {
        res.render("errorPage", {
          msg: "Your token has expired or is invalid.",
        });
      }
    } catch (error) {
      logger.error("Error finding token in login.controller: " + error);
      res.render("errorPage", {
        msg: "Error finding token in login.controller.",
      });
    }
  }

  async recoverByEmail(req, res) {
    const { email } = req.body;
    try {
      await recoverTokensService.sendRecoveryToken(email);
      res.status(200).render("login", {msg: `Token enviado correctamente a ${email}`});
    } catch (error) {
      logger.error("Error sending email in login.controller: " + error);
      res.status(404).render("errorPage", {
        msg: "Error sending email in login.controller.",
      });
    }
  }
}

export const tokensController = new TokensController();
