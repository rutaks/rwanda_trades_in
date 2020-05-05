import Admin from "../models/admin.model";
class AdminQueries {
  static async getTotalAdmins() {
    return await Admin.countDocuments({});
  }

  static assignPermissionsToSection(section, read, write, permissionsArr = []) {
    let permission = {};
    permission.section = section;
    permission.access = {
      read: read === "on",
      write: write === "on",
    };
    permissionsArr.push(permission);
  }
}

export default AdminQueries;
