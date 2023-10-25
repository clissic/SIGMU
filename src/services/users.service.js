import env from "../config/env.config.js";
import { usersModel } from "../DAO/models/users.model.js";
import { transport } from "../utils/nodemailer.js";
import { logger } from "../utils/logger.js";

class UserService {
  async getAll() {
    try {
      return await usersModel.getAll();
    } catch (error) {
      throw new Error("Failed to find users: " + error);
    }
  }

  async findById(id) {
    try {
      return await usersModel.findById(id);
    } catch (error) {
      throw new Error("Failed to find user by ID: " + error);
    }
  }

  async create({ avatar, first_name, last_name, rank, email, password }) {
    try {
      return await usersModel.create({
        avatar,
        first_name,
        last_name,
        rank,
        email,
        password,
      });
    } catch (error) {
      throw new Error("Failed to create a user: " + error);
    }
  }

  async updateOne({
    _id,
    avatar,
    first_name,
    last_name,
    rank,
    email,
    password,
    role,
  }) {
    try {
      return await usersModel.updateOne({
        _id,
        avatar,
        first_name,
        last_name,
        rank,
        email,
        password,
        role,
      });
    } catch (error) {
      throw new Error("Failed to update user by ID");
    }
  }

  async deletOne({ _id }) {
    try {
      return await usersModel.deleteOne({ _id });
    } catch (error) {
      throw new Error("Failed to delete user by ID: " + error);
    }
  }

  async findByEmail(email) {
    try {
      return await usersModel.findByEmail(email);
    } catch (error) {
      throw new Error("Failed to find user by email: " + error);
    }
  }

  async updatePassword({ email, newPassword }) {
    try {
      return await usersModel.updatePassword({ email, newPassword });
    } catch (error) {
      throw new Error("Failed to update password: " + error);
    }
  }

  async updateFines({ _id, fines }) {
    try {
      return await usersModel.updateFines({ _id, fines });
    } catch (error) {
      throw new Error("Failed to update fines: " + error);
    }
  }

  async sendNewAccEmail({first_name, last_name, rank, email, newAccBody}) {
    const API_URL = env.apiUrl;
    try {
      await transport.sendMail({
        from: env.googleEmail,
        to: env.googleEmail,
        subject: "[SIGMU] Solicitud de creación de cuenta",
        html: `
                <div>
                    <h1>SIGMU</h1>
                    <p>Solicitud de nueva cuenta del Sr./Sra.:</p>
                    <h3>${rank} ${first_name} ${last_name}</h3>
                    <h4>${email}</h4>
                    <p>Justificación:</p>
                    <strong>${newAccBody}</strong>
                    <p>Se ruega no responder a este correo ya que se trata de un servicio automático de SIGMU.</p>
                </div>
            `,
      });
    } catch (error) {
      logger.error(`Email could not be sent successfully: ` + error);
    }
  }
}

export const userService = new UserService();
