"use strict";

const User = use('App/Models/User')
const Logger = use('Logger')

class AuthController {
  async login({
    request,
    response,
    auth
  }) {
    const {
      email,
      password
    } = request.all();
    // const authToken = await auth.attempt(email, password);
    // return response.json(authToken);
    try {
      if (await auth.attempt(email, password)) {
        const user = await User.findBy('email', email)
        const tokens = await auth.withRefreshToken().generate(user)
        response.cookie('refreshToken', tokens.refreshToken, {
          secure: true,
          httpOnly: true
        })
        return response.status(200).json(tokens.token)
      }
    } catch (err) {
      Logger.error(err)
      return response.status(401).send('Login')
    }
  }


}

module.exports = AuthController;
