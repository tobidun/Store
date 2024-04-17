import mongoose from "mongoose";
export function useDataBase() {
  mongoose.set("strictQuery", true);
  return mongoose.connect(
    process.env.DATABASE_ENDPOINT || "mongodb://localhost:27017/family-embassy"
  );
}
