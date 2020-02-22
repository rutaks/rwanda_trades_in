// import Admin from "../models/admin.model";
import Account from "../models/account.model";
import auth from "../helpers/auth";
import validate from "../helpers/validators";

/** Class Holding All User Authentication methods */
class AuthController {
  static getDashboard(req, res) {
    return res.render("server/index");
  }
  static async getLoginPage(req, res) {
    res.status(201).render("server/login");
  }

  // static async signup(req, res) {
  //   //TODO: ADD PROPER SIGNUP
  //   // const { error, value } = validate.user(req.body);
  // }

  static async login(req, res) {
    const { email, password } = req.body;
    const { value, error } = validate.account(email, password);

    if (error) return sendErrorMessage(res, error.details[0].message, value);
    // eslint-disable-next-line no-useless-catch
    try {
      const foundAccount = await Account.findOne({
        username: email
      }).populate("owner");
      if (!foundAccount) {
        return sendErrorMessage(res, "", value);
      }
      const isPasswordValid = auth.isPasswordValid(
        password,
        foundAccount.password
      );
      if (!isPasswordValid) {
        return sendErrorMessage(res, "", value);
      }
      req.session.isLoggedIn = true;
      req.session.account = foundAccount.owner;
      return res.redirect("/admin/");
    } catch (err) {
      throw err;
    }
  }
}

const sendErrorMessage = (res, message, fields) => {
  if (message.length < 1) message = "Invalid Username Or Password";
  return res.render("server/login", {
    previousInput: fields,
    error: message
  });
};

export default AuthController;
