import { model, Schema } from "mongoose";

export interface IUpload extends Document {
  url: string;
  path: string;
  created_at: Date;
  updated_at: Date;
}

export const UploadSchema = new Schema<IUpload>({
  url: { type: String, required: true },
  path: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const UploadModel = model<IUpload>("Upload", UploadSchema);
