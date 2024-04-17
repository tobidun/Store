import jwt from "jsonwebtoken";

const secretKey = process.env.TOKEN_KEY || "secretishere";
class Token {
  async createAccessToken(userId: string) {
    return jwt.sign({ userId }, secretKey, { expiresIn: "1d" });
  }
}

export const token = new Token();
