import Product from "../models/product.model";
import Category from "../models/category.model";

class CategoryQueries {
  static async getAllCategories() {
    return await Category.find().limit(10);
  }

  static async getHomePageComponents() {
    const menCategory = await Category.findOne({ name: "Men's Clothes" });
    const womenCategory = await Category.findOne({ name: "Women's Clothes" });
    let menProducts = [];
    let womenProducts = [];
    if (menCategory !== null) {
      menProducts = await Product.find({ category: menCategory.id })
        .populate("category")
        .limit(10);
    }
    if (womenCategory !== null) {
      womenProducts = await Product.find({ category: womenCategory.id })
        .populate("category")
        .limit(10);
    }
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
    if (!foundCategory) {
      const arr = [];
      const count = 0;
      const categoryId = "0";
      return { arr, count, categoryId };
    }
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
