"use strict";

const User = use("App/Models/User");
const DB = use("Database");
const Logger = use("Logger");

class AuthController {
  async login({ request, response, auth }) {
    const { email, password } = request.all();
    // const authToken = await auth.attempt(email, password);
    // return response.json(authToken);
    try {
      if (await auth.attempt(email, password)) {
        const user = await User.findBy("email", email);
        const tokens = await auth.withRefreshToken().generate(user);
        response.cookie("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
        });
        return response.status(200).send(tokens.token);
      }
    } catch (err) {
      Logger.error(err);
      return response.status(401).send("Login failed");
    }
  }

  async refresh({ request, response, auth }) {
    try {
      const refreshToken = request.cookie("refreshToken");
      const token = await auth
        .newRefreshToken()
        .generateForRefreshToken(refreshToken);
      response.cookie("refreshToken", token.refreshToken, {
        httpOnly: true,
      });
      return response.status(200).send(token.token);
    } catch (err) {
      Logger.error(err);
      return response.status(401).send("Error refreshing token");
    }
  }

  async logout({ request, response, auth }) {
    response.clearCookie("refreshToken");
    const user = await auth.getUser();
    await DB.from("tokens").where("user_id", user.id).delete();
    return response.status(200).send("Successfully logged out");
  }

  async getMe({ request, response, auth }) {
    try {
      const user = await auth.getUser();
      return response.status(200).json({
        user,
      });
    } catch (err) {
      Logger.error(err);
    }
  }
}

module.exports = AuthController;
