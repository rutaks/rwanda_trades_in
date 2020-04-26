import Admin from "../models/admin.model";
class AdminQueries {
  static async getTotalAdmins() {
    return await Admin.countDocuments({});
  }
}

export default AdminQueries;
