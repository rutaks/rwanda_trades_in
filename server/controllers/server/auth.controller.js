// import Admin from "../models/admin.model";
import Account from "../../models/account.model";
import Admin from "../../models/admin.model";
import auth from "../../helpers/auth";
import validate from "../../helpers/validators";
import TokenHelper from "../../helpers/TokenHelper";
import EmailHelper from "../../helpers/EmailHelper";
import PasswordHelper from "../../helpers/PasswordHelper";

const baseUrl = "server/partials/auth";
/** Class Holding All User Authentication methods */
class AuthController {
  static getDashboard(req, res) {
    return res.render("server/index");
  }
  static async getLoginPage(req, res) {
    res.status(201).render("server/login");
  }

  static async getCreateUserPage(req, res) {
    res.status(201).render(`${baseUrl}/add-user`);
  }

  static async createUserPage(req, res) {
    const { value, error } = validate.admin(req.body);
    if (error) {
      return sendErrorMessage_(
        res,
        error.details[0].message,
        value,
        "/add-user"
      );
    }
    try {
      const { token } = await TokenHelper.generateToken();
      value.accountCreationToken = token;
      const newAdmin = Admin(value);
      console.log(newAdmin);
      newAdmin.save();
      EmailHelper.sendAdminAccountCreationEmail(req, newAdmin);
      req.flash(
        "success",
        "Admin Created, Let him know to check his/her email"
      );
      return res.redirect("/admin/products");
    } catch (error) {
      //HANDLE ERROR
      sendErrorMessage_(
        res,
        "Something Went Wrong, Try again later.",
        value,
        "add-user"
      );
    }
  }

  static async getAdminCreationValidationPage(req, res) {
    const { token } = req.params;
    res.render("server/final-step", { token: token });
  }

  static async validateAdminCreation(req, res) {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;
    console.log(password);
    if (!(await PasswordHelper.isSecurePassword(password))) {
      req.flash("error", "Passwords is not strong enough");
      return res.redirect(`/auth/final-step/${token}`);
    }
    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match");
      return res.redirect(`/auth/final-step/${token}`);
    }
    try {
      const foundAdmin = await Admin.findOne({ accountCreationToken: token });
      if (!foundAdmin) {
        req.flash("error", "No admin With the registered token found");
        return res.redirect(`/auth/final-step/${token}`);
      }
      const newAccount = Account({
        username: foundAdmin.email,
        password: await PasswordHelper.hashPassword(password),
        owner: foundAdmin,
      });
      newAccount.save();
      foundAdmin.accountCreationToken = "";
      foundAdmin.save();
      req.flash("success", "Admin was successfully validated");
      res.redirect("/auth/login");
    } catch (error) {
      req.flash("error", "Something Happened Try Again Later");
      return res.redirect(`/auth/final-step/${token}`);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const { value, error } = validate.account(email, password);

    if (error) {
      if (error.details)
        return sendErrorMessage(res, error.details[0].message, value);
      else return sendErrorMessage(res, error.message, value);
    }

    // eslint-disable-next-line no-useless-catch
    try {
      const foundAccount = await Account.findOne({
        username: email,
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
    error: message,
  });
};

const sendErrorMessage_ = async (res, message, fields, route) => {
  return res.render(`${baseUrl}${route}`, {
    previousInput: fields,
    error: message,
  });
};
export default AuthController;
