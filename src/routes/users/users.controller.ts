import express from "express";
import { userService } from "./users.service";

export const UserRouter = express.Router();

UserRouter.post("/signup", async (req, res, next) => {
  try {
    const result = await userService.createUser(req.body);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

UserRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await userService.login(username, password);
    res.send(result);
  } catch (e) {
    next(e);
  }
});
