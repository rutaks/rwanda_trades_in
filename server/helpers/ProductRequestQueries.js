import ProductRequest from "../models/productRequest.model";
import Product from "../models/product.model";
import DateHelper from "./DateHelper";

class ProductRequestQueries {
  static async getTotalRequests() {
    return await ProductRequest.countDocuments({});
  }
  static async getTopAcceptedRequests(
    limit = 4,
    query = "name successfulRequests rejectedRequests"
  ) {
    const foundRequests = await Product.find()
      .sort("successfulRequests")
      .select(query)
      .limit(limit);
    return foundRequests;
  }

  static async getTopRejectedRequests(
    limit = 4,
    query = "name successfulRequests rejectedRequests"
  ) {
    const foundRequests = await Product.find()
      .sort("rejectedRequests")
      .select(query)
      .limit(limit);
    return foundRequests;
  }

  static async getTotalRequestsCountByMonth({
    firstDayOfMonth,
    lastDayOfMonth,
  }) {
    const month = DateHelper.getMonthName(firstDayOfMonth.getMonth());
    const total = await ProductRequest.countDocuments({
      createdOn: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
    });

    return { month, total };
  }
}

export default ProductRequestQueries;
