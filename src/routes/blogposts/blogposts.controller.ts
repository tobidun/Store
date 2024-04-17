import express from "express";
import { blogPostService } from "./blogposts.service";

export const BlogPostRouter = express.Router();

BlogPostRouter.post("/", async (req, res, next) => {
  try {
    const result = await blogPostService.createBlog(req.body);
    res.send(result);
  } catch (e) {
    next(e);
  }
});

BlogPostRouter.get("/", async (req, res, next) => {
  try {
    const result = await blogPostService.getBlogs();
    res.send(result);
  } catch (e) {
    next(e);
  }
});
