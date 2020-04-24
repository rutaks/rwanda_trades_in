import Product from "../models/product.model";

class ProductQueries {
  static async getProductByProductId(productId) {
    return await Product.findOne({ _id: productId }).populate("category");
  }

  static async getProductsByCategoryId(categoryId, limit = 5) {
    return await Product.find({ category: categoryId }).limit(limit);
  }
}

export default ProductQueries;
