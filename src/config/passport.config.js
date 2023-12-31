import passport from "passport";
import local from "passport-local";
import { UserMongoose } from "../DAO/models/mongoose/users.mongoose.js";
import { userService } from "../services/users.service.js";
import { createHash, isValidPassword } from "../utils/Bcrypt.js";
import { logger } from "../utils/logger.js";

const LocalStrategy = local.Strategy;

export function iniPassport() {
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await UserMongoose.findOne({ email: username });
          if (!user) {
            logger.info("User not found with username (email) " + username);
            return done(null, false);
          }
          if (!isValidPassword(password, user.password)) {
            logger.info("Invalid password");
            return done(null, false);
          }
          logger.info(`${user.rank} ${user.first_name} ${user.last_name} is logged as ${user.role}`);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const { avatar, first_name, last_name, rank, email, password } = req.body;
          let user = await UserMongoose.findOne({ email: username });
          if (user) {
            logger.info("User already exists");
            return done(null, false);
          }
          const newUser = {
            avatar: avatar || "./img/avatar.png",
            first_name,
            last_name,
            rank,
            email,
            password: createHash(password),
          };
          let userCreated = await userService.create(newUser);
          logger.info(userCreated);
          logger.info("User registration succesful");
          return done(null, userCreated);
        } catch (e) {
          logger.info("Error in register: " + e);
          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
});

  passport.deserializeUser(async (id, done) => {
    let user = await userService.findById(id);

    done(null, user);
  });
}
