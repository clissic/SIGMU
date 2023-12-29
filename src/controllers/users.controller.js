import { userService } from "../services/users.service.js";
import { createHash } from "../utils/Bcrypt.js";
import { logger } from "../utils/logger.js";
import UserDTO from "./DTO/users.dto.js";

class UsersController {
  async getAll(req, res) {
    try {
      const users = await userService.getAll();
      return res.status(200).json({
        status: "success",
        msg: "All users found",
        payload: users,
      });
    } catch (e) {
      logger.info(e);
      return res.status(500).json({
        status: "error",
        msg: "Something went wrong",
        payload: {},
      });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.findById(id);
      if (user) {
        return res.status(200).json({
          status: "success",
          message: "User by ID found",
          payload: user,
        });
      } else {
        return res
          .status(404)
          .json({ status: "error", message: "User does not exist" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      const { avatar, first_name, last_name, rank, email, password } = req.body;
      const userDTO = new UserDTO(
        avatar,
        first_name,
        last_name,
        rank,
        email,
        createHash(password)
      );
      if (!userDTO.first_name || !userDTO.last_name || !userDTO.email) {
        logger.info(
          "Validation error: please complete first_name, last_name and email."
        );
        return res.status(400).json({
          status: "error",
          msg: "Please complete first_name, last_name and email.",
          payload: {},
        });
      }
      const userCreated = await userService.create(userDTO);
      return res.status(201).json({
        status: "success",
        msg: "User created",
        payload: userCreated,
      });
    } catch (e) {
      return res.status(500).json({
        status: "error",
        msg: "Something went wrong: " + e,
        payload: {},
      });
    }
  }

  async updateOne(req, res) {
    try {
      const { _id } = req.params;
      const { avatar, first_name, last_name, email } = req.body;
      if (!first_name || !last_name || !email || !_id) {
        logger.info(
          "Validation error: please complete firstName, lastName and email."
        );
        return res.status(400).json({
          status: "error",
          msg: "Please complete first_name, last_name and email.",
          payload: {},
        });
      }
      try {
        const userUpdated = await userService.updateOne({
          _id,
          avatar,
          first_name,
          last_name,
          email,
        });
        logger.info(JSON.stringify(userUpdated));
        if (userUpdated.matchedCount > 0) {
          return res.status(201).json({
            status: "success",
            msg: "User updated",
            payload: {},
          });
        } else {
          return res.status(404).json({
            status: "error",
            msg: "User not found",
            payload: {},
          });
        }
      } catch (e) {
        return res.status(500).json({
          status: "error",
          msg: "db server error while updating user",
          payload: {},
        });
      }
    } catch (e) {
      logger.info(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong",
        payload: {},
      });
    }
  }

  async deleteOne(req, res) {
    try {
      const { _id } = req.params;

      const result = await userService.deleteOne({ _id });

      if (result?.deletedCount > 0) {
        return res.status(200).json({
          status: "success",
          msg: "User deleted",
          payload: {},
        });
      } else {
        return res.status(404).json({
          status: "failed",
          msg: "User not found",
          payload: {},
        });
      }
    } catch (e) {
      logger.info(e);
      return res.status(500).json({
        status: "error",
        msg: "Something went wrong",
        payload: {},
      });
    }
  }

  async updatePassword(req, res) {
    try {
      const email = req.session.user.email;
      const password = req.body;
      const userUpdated = await userService.updatePassword({ email, password });
      if (userUpdated) {
        return res.status(200).json({
          status: "success",
          msg: "Password updated",
          payload: {},
        });
      } else {
        return res.status(400).json({
          status: "failed",
          msg: "Password could not be updated",
          payload: {},
        });
      }
    } catch (error) {
      logger.info(e);
      return res.status(500).json({
        status: "error",
        msg: "Something went wrong " + error,
        payload: {},
      });
    }
  }

  async updatePasswordAndRender(req, res) {
    try {
      const user = req.session.user;
      const email = req.session.user.email;
      const { newPassword, confirmPassword } = req.body;
      if (newPassword == confirmPassword) {
        const userUpdated = await userService.updatePassword({ email, newPassword: createHash(newPassword) });
        if (userUpdated.acknowledged == true) {
          logger.info(email + " actualizó su contraseña con éxito")
          return res.status(200).render("success", { msg: "Contraseña actualizada con éxito."});
        } else {
          logger.error(email + " NO logró actualizar su contraseña con éxito")
          return res.status(400).render("errorPage", { msg: "La contraseña no ha podido ser actualizada." });
        }
      } else {
        return res.status(400).render("updatePasswordForm", { email, user, msg: "LAS CONTRASEÑAS DEBEN COINCIDIR"})
      }
    } catch (error) {
      logger.error("Error de servidor: " + error);
      return res.status(500).json({
        status: "error",
        msg: "Something went wrong " + error,
        payload: {},
      });
    }
  }

  async sendNewAccEmail(req, res) {
    try {
      const { first_name, last_name, rank, email, newAccBody } = req.body;
      const emailSent = await userService.sendNewAccEmail({first_name, last_name, rank, email, newAccBody});
      return res
        .status(200)
        .render("success", { msg: "Solicitud enviada con éxito." });
    } catch (error) {
      logger.error("Error in users.controller sendNewAccEmail: " + error);
      return res
        .status(400)
        .render("errorPage", {
          msg: "La solicitud no fue realizada con exito.",
        });
    }
  }

  async updateDataAndRender(req, res) {
    try {
      const { first_name, newFirstName, last_name, newLastName, rank, newRank, role, newRole, email, newEmail, newDataBody } = req.body;
      const emailSent = await userService.sendNewDataEmail({ first_name, newFirstName, last_name, newLastName, rank, newRank, role, newRole, email, newEmail, newDataBody });
      return res.status(200).render("success", { msg: "Solicitud enviada con éxito." });
    } catch (error) {
      logger.error("Error in users.controller updateDataAndRender: " + error);
      return res.status(400).render("errorPage", { msg: "La solicitud no fue realizada con éxito." });
    }
  }

  async createAndSendEmail(req, res) {
    const user = req.session.user;
    try {
      const {first_name, last_name, rank, email, avatar} = req.body;
      const password = createHash("123456789");
      const emailSent = await userService.sendDataToNewUser({ first_name, last_name, rank, email })
      const userCreated = await userService.create({ avatar, first_name, last_name, rank, email, password})
      console.log(emailSent + " " + userCreated)
      if (emailSent && userCreated) {
        logger.info(`La cuenta de ${email} fue creada correctamente por ${user.email} (${user.rank}).`);
        return res.status(200).render("success", { msg: `Cuenta de ${email} fue creada con éxito.` });
      } else {
        logger.info(`La cuenta de ${email} no fue creada correctamente por ${user.email} (${user.rank})`)
        return res.status(400).render("errorPage", { msg: "La cuenta no pudo ser creada con éxito."})
      }
    } catch (error) {
      logger.error("Error in users.controller createAndSendEmail: " + error);
      return res.status(400).render("errorPage", { msg: "La cuenta no pudo ser creada con éxito debido a un error del servidor. Por favor, verifica que el email utilizado no se encuentre ya en uso e intentelo nuevamente." });
    }
  }
}

export const usersController = new UsersController();
