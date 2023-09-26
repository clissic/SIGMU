import { usersModel } from "../DAO/models/users.model.js";

class UserService {
  async getAll() {
    try {
      return await usersModel.getAll();
    } catch (error) {
      throw new Error("Failed to find users");
    }
  }

  async findById(id) {
    try {
      return await usersModel.findById(id);
    } catch (error) {
      throw new Error("Failed to find user by ID");
    }
  }

  async create({ first_name, last_name, email, password }) {
    try {
      return await usersModel.create({
        first_name,
        last_name,
        rank,
        email,
        password,
      });
    } catch {
      throw new Error("Failed to create a user");
    }
  }

  async updateOne({
    _id,
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
      throw new Error("Failed to delete user by ID");
    }
  }

  async findByEmail(email) {
    try {
      return await usersModel.findByEmail(email);
    } catch (error) {
      throw new Error("Failed to find user by email");
    }
  }

  async updatePassword(email, newPassword) {
    try {
      return await usersModel.updatePassword({ email, newPassword });
    } catch(error) {
      throw new Error("Failed to update password");
    }
  }
}

export const userService = new UserService();