import { isValidPassword } from "../../utils/Bcrypt.js";
import { UserMongoose } from "./mongoose/users.mongoose.js";

export default class UsersModel {
  async getAll() {
    const users = await UserMongoose.find(
      {},
      {
        _id: true,
        first_name: true,
        last_name: true,
        rank: true,
        email: true,
        role: true,
        fines: true,
      }
    );
    return users;
  }

  async findById(id) {
    const userFound = await UserMongoose.findById(id);
    return userFound;
  }

  async findUser(email, password) {
    const user = await UserMongoose.findOne(
      { email: email },
      {
        _id: true,
        first_name: true,
        last_name: true,
        rank: true,
        email: true,
        password: true,
        role: true,
        fines: true,
      }
    );
    if (user && isValidPassword(password, user.password)) {
      return user;
    } else {
      return false;
    }
  }

  async findByEmail(email) {
    const user = await UserMongoose.findOne(
      { email: email },
      {
        _id: true,
        first_name: true,
        last_name: true,
        rank: true,
        email: true,
        password: true,
        role: true,
        fines: true,
      }
    );
    return user;
  }

  async create({ first_name, last_name, rank, email, password, role, fines }) {
    const userCreated = await UserMongoose.create({
      first_name,
      last_name,
      rank,
      email,
      password,
      role,
      fines,
    });
    return userCreated;
  }

  async updateOne({
    _id,
    first_name,
    last_name,
    rank,
    email,
    password,
    role,
    fines,
  }) {
    const userUpdated = await UserMongoose.updateOne(
      {
        _id: _id,
      },
      {
        first_name,
        last_name,
        rank,
        email,
        password,
        role,
        fines,
      }
    );
    return userUpdated;
  }

  async deleteOne(_id) {
    const result = await UserMongoose.deleteOne({ _id: _id });
    return result;
  }

  async updatePassword(email, newPassword) {
    const userUpdated = await UserMongoose.updateOne(
      { email: email },
      {
        password: newPassword,
      }
    );
  }
}

export const usersModel = new UsersModel();
