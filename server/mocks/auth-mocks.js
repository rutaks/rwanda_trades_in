import Admin from "../models/admin.model";
import Account from "../models/account.model";
import auth from "../helpers/auth";

class AuthMocks {
  static async setupAdmin() {
    // permissions: [
    //   {
    //     section: String,
    //     access: {
    //       read: Boolean,
    //       write: Boolean,
    //     },
    //   },
    // ]
    let permissions = [
      {
        section: "admins",
        access: {
          read: true,
          write: true,
        },
      },
    ];
    try {
      const foundAdmin = await Admin.findOne({
        email: "rootsum.dev@gmail.com",
      });
      if (foundAdmin) return true;
      let admin = new Admin({
        firstname: "John",
        lastname: "Doe",
        email: "rootsum.dev@gmail.com",
        gender: "Male",
        permissions: permissions,
      });
      await admin.save();
      let hashPassword = auth.hashPassword("Password123!@#");
      let account = new Account({
        username: "rootsum.dev@gmail.com",
        password: hashPassword,
        owner: admin._id,
      });
      await account.save();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default AuthMocks;
