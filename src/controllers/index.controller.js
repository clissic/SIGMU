import mongoose from "mongoose";
import { CarFinesMongoose } from "../DAO/models/mongoose/carFines.mongoose.js";
import { UserMongoose } from "../DAO/models/mongoose/users.mongoose.js";
import { carFinesServices } from "../services/carFines.service.js";
import { logger } from "../utils/logger.js";

class IndexController {
  async indexRender(req, res) {
    const user = req.session.user;
    return res.status(200).render("index", { user });
  }

  async homeRender(req, res) {
    const user = req.session.user;
    const finesQuantity = req.session.user.fines.length;
    return res.status(200).render("home", { user, finesQuantity });
  }

  async carFineFormRender(req, res) {
    const user = req.session.user;
    return res.status(200).render("carFineForm", { user });
  }

  async successRender(req, res) {
    const msg = "Redireccionando al panel de control de usuario en breve...";
    const user = req.session.user;
    return res.status(200).render("success", { msg, user });
  }

  async userFinesRender(req, res) {
    const user = req.session.user;
    const userFines = await carFinesServices.findByEmail(user.email);
    const filteredUserFines = userFines.map((fine) => {
      return {
        _id: fine._id,
        fine_number: fine.fine_number,
        fine_date: fine.fine_date,
        fine_time: fine.fine_time,
        fine_article: fine.fine_article,
        fine_amount: fine.fine_amount,
        fine_extra_amount: fine.fine_extra_amount,
        fine_author: fine.fine_author,
        fine_proves: fine.fine_proves,
        fine_status: fine.fine_status,
        car_brand: fine.car_brand,
        car_model: fine.car_model,
        car_reg_number: fine.car_reg_number,
        owner_ci: fine.owner_ci,
        owner_name: fine.owner_name,
        owner_tel: fine.owner_tel,
        owner_dir: fine.owner_dir,
      };
    });
    return res
      .status(200)
      .render("userFines", { user, userFines: filteredUserFines });
  }

  async updatePassword(req, res) {
    const user = req.session.user;
    const email = req.session.user.email;
    return res.status(200).render("updatePasswordForm", { user, email });
  }

  async updateDataForm(req, res) {
    const user = req.session.user;
    return res.status(200).render("updateDataForm", { user });
  }

  async getAllCarFines(req, res) {
    const user = req.session.user;
    return res.status(200).render("allCarFinesPaginated", { user });
  }

  async paginateCarFines(req, res) {
    const user = req.session.user;
    try {
      let {
        currentPage,
        pageSize,
        sort,
        fine_number,
        fine_date,
        fine_article,
        fine_amount,
        fine_author,
        fine_status,
        car_brand,
        car_model,
        car_reg_number,
        owner_ci,
        owner_name,
      } = req.query;
      const sortOption =
        sort === "asc"
          ? { fine_date: 1 }
          : sort === "desc"
          ? { fine_date: -1 }
          : {};

      const options = {
        sort: sortOption,
        limit: parseInt(pageSize, 10) || 10,
        page: parseInt(currentPage, 10) || 1,
      };

      // En el método de paginación
      const mongooseFilter = {};

      // Lógica de los filtros
      if (fine_number) {
        mongooseFilter.fine_number = fine_number;
      }
      if (fine_date) {
        mongooseFilter.fine_date = { $regex: new RegExp(fine_date) };
      }
      if (fine_article) {
        mongooseFilter.fine_article = { $regex: new RegExp(fine_article, "i") };
      }
      if (fine_amount) {
        mongooseFilter.fine_amount = fine_amount;
      }
      if (fine_author) {
        mongooseFilter.fine_author = { $regex: new RegExp(fine_author, "i") };
      }
      if (fine_status) {
        mongooseFilter.fine_status = fine_status;
      }
      if (car_brand) {
        mongooseFilter.car_brand = { $regex: new RegExp(car_brand, "i") };
      }
      if (car_model) {
        mongooseFilter.car_model = { $regex: new RegExp(car_model, "i") };
      }
      if (car_reg_number) {
        mongooseFilter.car_reg_number = {
          $regex: new RegExp(car_reg_number, "i"),
        };
      }
      if (owner_ci) {
        mongooseFilter.owner_ci = { $regex: new RegExp(owner_ci) };
      }
      if (owner_name) {
        mongooseFilter.owner_name = { $regex: new RegExp(owner_name, "i") };
      }

      const queryResult = await CarFinesMongoose.paginate(
        mongooseFilter,
        options
      );

      const paginatedFines = queryResult.docs.map((fine) => {
        return {
          _id: fine._id,
          fine_number: fine.fine_number,
          fine_date: fine.fine_date,
          fine_time: fine.fine_time,
          fine_article: fine.fine_article,
          fine_amount: fine.fine_amount,
          fine_extra_amount: fine.fine_extra_amount,
          fine_author: fine.fine_author,
          fine_proves: fine.fine_proves,
          fine_status: fine.fine_status,
          car_brand: fine.car_brand,
          car_model: fine.car_model,
          car_reg_number: fine.car_reg_number,
          owner_ci: fine.owner_ci,
          owner_name: fine.owner_name,
          owner_tel: fine.owner_tel,
          owner_dir: fine.owner_dir,
        };
      });

      const {
        totalDocs,
        limit,
        totalPages,
        page,
        pagingCounter,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
      } = queryResult;

      const prevLink = hasPrevPage ? `/index/allCarFines?currentPage=${prevPage}&pageSize=${pageSize || ""}&fine_number=${fine_number ? fine_number : ""}&fine_date=${fine_date ? fine_date : ""}&fine_article=${fine_article ? fine_article : ""}&fine_amount=${fine_amount ? fine_amount : ""}&fine_author=${fine_author ? fine_author : ""}&fine_status=${fine_status ? fine_status : ""}&car_brand=${car_brand ? car_brand : ""}&car_model=${car_model ? car_model : ""}&car_reg_number=${car_reg_number ? car_reg_number : ""}&owner_ci=${owner_ci ? owner_ci : ""}&owner_name=${owner_name ? owner_name : ""}`: null;

      const nextLink = hasNextPage ? `/index/allCarFines?currentPage=${nextPage}&pageSize=${pageSize || ""}&fine_number=${fine_number ? fine_number : ""}&fine_date=${fine_date ? fine_date : ""}&fine_article=${fine_article ? fine_article : ""}&fine_amount=${fine_amount ? fine_amount : ""}&fine_author=${fine_author ? fine_author : ""}&fine_status=${fine_status ? fine_status : ""}&car_brand=${car_brand ? car_brand : ""}&car_model=${car_model ? car_model : ""}&car_reg_number=${car_reg_number ? car_reg_number : ""}&owner_ci=${owner_ci ? owner_ci : ""}&owner_name=${owner_name ? owner_name : ""}`: null;

      return res
        .status(200)
        .render("allCarFinesPaginated", {
          user,
          paginatedFines,
          totalDocs,
          limit,
          totalPages,
          page,
          pagingCounter,
          prevLink,
          nextLink,
          hasNextPage,
          hasPrevPage,
        }); /* json({
        status: 'success',
        msg: 'Fines list',
        payload: {
          paginatedFines,
          totalDocs,
          limit,
          totalPages,
          prevPage,
          nextPage,
          page,
          hasPrevPage,
          hasNextPage,
          prevLink,
          nextLink,
          pagingCounter,
        },
      }); */
    } catch (error) {
      console.error("Error getting fines and pagination:", error);
      return res.status(500).json({
        status: "error",
        msg: "Error getting fines and pagination.",
      });
    }
  }

  async carFinesMenuRender(req, res) {
    const user = req.session.user;
    return res.status(200).render("carFinesMenu", { user });
  }

  async shipFinesMenuRender(req, res) {
    const user = req.session.user;
    return res.status(200).render("shipFinesMenu", { user });
  }

  async usersMenuRender(req, res) {
    const user = req.session.user;
    return res.status(200).render("usersMenu", { user });
  }

  async toolsMenuRender(req, res) {
    const user = req.session.user;
    return res.status(200).render("toolsMenu", { user });
  }

  async aisToolRender(req, res) {
    const user = req.session.user;
    return res.status(200).render("aisTool", { user });
  }

  async weatherToolRender(req, res) {
    const user = req.session.user;
    return res.status(200).render("weatherTool", { user });
  }

  async camerasToolRender(req, res) {
    const user = req.session.user;
    return res.status(200).render("camerasTool", { user });
  }

  async updateCarFineRender(req, res) {
    const user = req.session.user;
    return res.status(200).render("updateCarFine", { user });
  }

  async arrivesToolRender(req, res) {
    const user = req.session.user;
    return res.status(200).render("arrivesTool", { user });
  }

  async deleteCarFineRender(req, res) {
    const user = req.session.user;
    return res.status(200).render("deleteCarFine", { user });
  }

  async createUserRender(req, res) {
    const user = req.session.user;
    return res.status(200).render("newUser", { user });
  }

  async paginateUsers(req, res) {
    const user = req.session.user;
    try {
      let {
        currentPage,
        pageSize,
        sort,
        first_name,
        last_name,
        rank,
        email,
        role,
        fines,
      } = req.query;
      const sortOption =
        sort === "asc"
          ? { last_name: 1 }
          : sort === "desc"
          ? { last_name: -1 }
          : {};

      const options = {
        sort: sortOption,
        limit: parseInt(pageSize, 10) || 10,
        page: parseInt(currentPage, 10) || 1,
      };

      // En el método de paginación
      const mongooseFilter = {};

      // Lógica de los filtros
      if (first_name) {
        mongooseFilter.first_name = { $regex: new RegExp(first_name, "i") };
      }
      if (last_name) {
        mongooseFilter.last_name = { $regex: new RegExp(last_name, "i") };
      }
      if (rank) {
        mongooseFilter.rank = { $regex: new RegExp(rank, "i") };
      }
      if (email) {
        mongooseFilter.email = { $regex: new RegExp(email, "i") };
      }
      if (role) {
        mongooseFilter.role = { $regex: new RegExp(role, "i") };
      }
      if (fines) {
        mongooseFilter.fines = { $size: parseInt(fines, 10) };
      }

      const queryResult = await UserMongoose.paginate(
        mongooseFilter,
        options
      );

      const paginatedUsers = queryResult.docs.map((user) => {
        return {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          rank: user.rank,
          email: user.email,
          role: user.role,
          fines: user.fines.length,
          avatar: user.avatar,
        };
      });

      const {
        totalDocs,
        limit,
        totalPages,
        page,
        pagingCounter,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
      } = queryResult;

      const prevLink = hasPrevPage ? `/index/allCarFines?currentPage=${prevPage}&pageSize=${pageSize || ""}&first_name=${first_name ? first_name : ""}&last_name=${last_name ? last_name : ""}&rank=${rank ? rank : ""}&email=${email ? email : ""}&role=${role ? role : ""}`: null;

      const nextLink = hasNextPage ? `/index/allCarFines?currentPage=${nextPage}&pageSize=${pageSize || ""}&first_name=${first_name ? first_name : ""}&last_name=${last_name ? last_name : ""}&rank=${rank ? rank : ""}&email=${email ? email : ""}&role=${role ? role : ""}`: null;

      return res
        .status(200)
        .render("allUsersPaginated", {
          user,
          paginatedUsers,
          totalDocs,
          limit,
          totalPages,
          page,
          pagingCounter,
          prevLink,
          nextLink,
          hasNextPage,
          hasPrevPage,
        }); /* json({
        status: 'success',
        msg: 'Fines list',
        payload: {
          paginatedFines,
          totalDocs,
          limit,
          totalPages,
          prevPage,
          nextPage,
          page,
          hasPrevPage,
          hasNextPage,
          prevLink,
          nextLink,
          pagingCounter,
        },
      }); */
    } catch (error) {
      console.error("Error getting users and pagination:", error);
      return res.status(500).json({
        status: "error",
        msg: "Error getting users and pagination.",
      });
    }
  }

  async updateUser (req, res) {
    const user = req.session.user;
    return res.status(200).render("updateUser", { user })
  }
}

export const indexController = new IndexController();
