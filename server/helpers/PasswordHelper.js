import bcrypt from "bcrypt";

class PasswordHelper {
  static isPasswordValid(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static isSecurePassword(password) {
    let regex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return password.match(regex);
  }
}

export default PasswordHelper;
