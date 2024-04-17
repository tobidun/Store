import { BlogPostModel, IBlogPost } from "./blogposts.model";

class BlogPostService {
  async createBlog(body: IBlogPost) {
    try {
      const { title, description } = body;
      const blog = await BlogPostModel.create({ title, description });
      return blog;
    } catch (e) {
      throw e;
    }
  }

  async getBlogs() {
    try {
      const blogs = await BlogPostModel.find({});
      return blogs;
    } catch (e) {
      throw e;
    }
  }
}

export const blogPostService = new BlogPostService();
