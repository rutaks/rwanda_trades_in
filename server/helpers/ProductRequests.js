import ProductRequest from "../models/productRequest.model";

class ProductRequestQueries {
  static async getTotalRequests() {
    return await ProductRequest.countDocuments({});
  }
}

export default ProductRequestQueries;
