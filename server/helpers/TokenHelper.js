import env from "custom-env";
import crypto from "crypto";

env.env();

class TokenHelper {
  static async generateToken() {
    const token = crypto.randomBytes(20).toString("hex");
    const expiryDate = Date.now() + 3600000; //expires in an hour
    return { token, expiryDate };
  }
}
export default TokenHelper;
