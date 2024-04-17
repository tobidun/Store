import DBG from "debug";
import express, { NextFunction, Request, Response } from "express";
import { useDataBase } from "./libs/db";

import dotenv from "dotenv";

import { BlogPostRouter } from "routes/blogposts/blogposts.controller";
import { EventRouter } from "routes/events/events.controller";
import { UserRouter } from "routes/users/users.controller";
export const app = express();
const debug = DBG("family-embassy:server");
dotenv.config();

process.env.NODE_ENV !== "test" &&
  useDataBase()
    .then(() => {
      debug("Database connect successfully");
    })
    .catch((err) => {
      debug(err);
      debug("Error in connecting to database");
    });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", UserRouter);
app.use("/events", EventRouter);
app.use("/blogposts", BlogPostRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.statusCode || err.status || 500)
    .send({ message: err.message, success: false });
});
