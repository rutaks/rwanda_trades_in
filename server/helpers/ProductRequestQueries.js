import ProductRequest from "../models/productRequest.model";
import Product from "../models/product.model";

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
}

export default ProductRequestQueries;
