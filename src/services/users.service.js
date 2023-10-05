import { usersModel } from "../DAO/models/users.model.js";

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

  async updatePassword({email, newPassword}) {
    try {
      return await usersModel.updatePassword({ email, newPassword });
    } catch(error) {
      throw new Error("Failed to update password: " + error);
    }
  }

  async updateFines({_id, fines}) {
    try {
      return await usersModel.updateFines({_id, fines})
    } catch (error) {
      throw new Error("Failed to update fines: " + error)
    }
  }
}

export const userService = new UserService();