import bcrypt from "bcrypt";
import { token } from "middlewares/token";
import { IUser, UserModel } from "./users.model";

class UserService {
  async createUser(data: IUser) {
    try {
      const { username, email } = data;
      if (!username) throw new Error("Username is required");
      if (!email) throw new Error("Email is required");
      if (!data.password) throw new Error("Password is required");
      const is_user_exist = await UserModel.findOne({
        or: [{ username }, { email }],
      });
      if (is_user_exist?.email === email)
        throw new Error("Email already exist");
      if (is_user_exist?.username === username)
        throw new Error("Username already exist");
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
      const newUser = await UserModel.create({ ...data });
      const accessToken = await token.createAccessToken(newUser._id);
      return { success: true, accessToken: accessToken };
    } catch (e) {
      throw e;
    }
  }

  async login(username: string, password: string) {
    try {
      const profile = await UserModel.findOne({ username: username });
      if (!profile) throw new Error("Invalid login credentials");
      const comparePasswords = await bcrypt.compare(password, profile.password);
      if (!comparePasswords) throw new Error("Invalid login credentials");
      else {
        const accessToken = await token.createAccessToken(profile._id);
        return { success: true, accessToken: accessToken };
      }
    } catch (e) {
      throw e;
    }
  }
}

export const userService = new UserService();
