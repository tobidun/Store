import { Document, model, Model, Schema } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const BlogPostModel: Model<IBlogPost> = model<IBlogPost>(
  "BlogPost",
  BlogPostSchema
);
