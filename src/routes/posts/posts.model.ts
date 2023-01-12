import { Document, model, Model, Schema, Types } from "mongoose";
import { IUser } from "routes/users/users.model";

export interface IPost extends Document {
  description: string;
  user: Types.ObjectId | IUser;
  created_at: Date;
  updated_at: Date;
}

export const PostSchema = new Schema<IPost>({
  description: { type: String },
  user: { type: Schema.Types.ObjectId, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const PostModel: Model<IPost> = model<IPost>("Post", PostSchema);
