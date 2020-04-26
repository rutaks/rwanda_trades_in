import env from "custom-env";
import crypto from "crypto";

env.env();

class TokenHelper {
  static async generateToken() {
    const token = crypto.randomBytes(20).toString("hex");
    const expiryDate = Date.now() + 3600000; //expires in an hour
    return { token, expiryDate };
  }

  static async generatePasswordResetToken() {
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpires = Date.now() + 3600000; //expires in an hour
    return { resetPasswordToken, resetPasswordExpires };
  }
}
export default TokenHelper;
