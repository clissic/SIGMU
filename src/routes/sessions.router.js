import express from "express";
import passport from "passport";
import { sessionsController } from "../controllers/sessions.controller.js";

export const sessionsRouter = express.Router();

sessionsRouter.post("/signup", passport.authenticate('register', { failureRedirect: '/error-auth' }), sessionsController.signup);

sessionsRouter.post("/login", passport.authenticate('login', { failureRedirect: '/error-auth' }), sessionsController.login);

sessionsRouter.get("/logout", sessionsController.logout)