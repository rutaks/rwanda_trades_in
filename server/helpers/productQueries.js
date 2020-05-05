import Product from "../models/product.model";

class ProductQueries {
  static async getProductByProductId(productId) {
    return await Product.findOne({ _id: productId }).populate("category");
  }

  static async getProductsByCategoryId(categoryId, limit = 5) {
    return await Product.find({ category: categoryId }).limit(limit);
  }

  static async getTotalProcucts() {
    return await Product.countDocuments({});
  }

  static async getDepartmentProductsByName(productName, page, resPerPage) {
    const foundProducts = await Product.find({
      name: {
        $regex: productName,
        $options: "i",
      },
    })
      .skip(resPerPage * page - resPerPage)
      .limit(resPerPage);
    const count = await Product.count({
      name: {
        $regex: productName,
        $options: "i",
      },
    });
    return { foundProducts, count };
  }
}

export default ProductQueries;
