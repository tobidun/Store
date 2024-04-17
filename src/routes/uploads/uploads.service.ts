import { S3Client } from "@aws-sdk/client-s3";
import { readFile, unlinkSync } from "fs";
import { ObjectId } from "mongodb";
import sharp from "sharp";
import { UploadModel } from "./uploads.model";

type IhandleUploadType = {
  serverDir: string;
  fileName: string;
};

export const handleUploadToCloud = ({
  serverDir,
  fileName,
}: IhandleUploadType): Promise<{ upload_id: ObjectId }> => {
  return new Promise((resolve, reject) => {
    readFile(fileName, async (readErr, readRes) => {
      try {
        if (readErr) reject(readErr);
        let file = await sharp(readRes).jpeg().toBuffer();
        let uploadFileUrl = `${serverDir}/${new ObjectId()}.jpeg`;
        const s3Client = new S3Client({});
        const upload = await UploadModel.create({
          url: process.env.URL,
          path: uploadFileUrl,
        });
      } catch (e) {
        unlinkSync(fileName);
        reject(e);
      }
    });
  });
};
