import compression from "compression";
import MongoStore from "connect-mongo";
import cors from "cors";
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import path from "path";
import { __dirname } from "./config.js";
import env from "./config/env.config.js";
import { iniPassport } from "./config/passport.config.js";
import { logger } from "./utils/logger.js";
import { connectMongo } from "./utils/db-connection.js";
// IMPORT ROUTERS
import { indexRouter } from "./routes/index.html.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { sessionsRouter } from "./routes/sessions.router.js";

const app = express();
const PORT = env.port;
const MONGO_PASSWORD = env.mongoPassword;
const dbName = "SIGMU_DB"

const httpServer = app.listen(PORT, () => {
  logger.info(`App running on ${__dirname} - server http://localhost:${PORT}`);
});

connectMongo();

app.use(
  session({
    secret: "A98dB973kWpfsdq99Kmo",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://joaquinperezcoria:${MONGO_PASSWORD}@cluster0.zye6fyd.mongodb.net/${dbName}?retryWrites=true&w=majority`,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
  })
);

app.use(cors());
app.use(compression());

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// CONFIG DEL MOTOR DE PLANTILLAS
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// CONFIG PASSPORT
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

// ENDPOINTS
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);

// RENDERS
app.use("/", indexRouter);