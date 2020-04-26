import Product from "../models/product.model";
import Category from "../models/category.model";

class CategoryQueries {
  static async getAllCategories() {
    return await Category.find().limit(10);
  }

  static async getHomePageComponents() {
    const menCategory = await Category.findOne({ name: "Men's Clothes" });
    const womenCategory = await Category.findOne({ name: "Women's Clothes" });
    const menProducts = await Product.find({ category: menCategory.id })
      .populate("category")
      .limit(10);
    const womenProducts = await Product.find({ category: womenCategory.id })
      .populate("category")
      .limit(10);
    return { menProducts, womenProducts };
  }

  static async getDepartmentProducts(categoryId, page, resPerPage) {
    const foundProducts = await Product.find({ category: categoryId })
      .skip(resPerPage * page - resPerPage)
      .limit(resPerPage);
    const count = await Product.count({ category: categoryId });
    return { foundProducts, count };
  }

  static async getDepartmentProductsByName(categoryName, page, resPerPage) {
    const foundCategory = await Category.findOne({ name: categoryName });
    let res = await this.getDepartmentProducts(
      foundCategory._id,
      page,
      resPerPage
    );
    res.categoryId = foundCategory._id;
    return res;
  }

  static async getTotalCategories() {
    return await Product.countDocuments({});
  }
}

export default CategoryQueries;
