import bcrypt from "bcrypt";

class Auth {
  static isPasswordValid(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }
}

export default Auth;
