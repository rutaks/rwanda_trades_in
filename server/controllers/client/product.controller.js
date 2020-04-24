import categoryQuery from "../../helpers/categoryQueries";

class ProductController {
  static async getProduct(req, res) {
    const categories = await categoryQuery.getAllCategories();
    return res.render("client/shop-item", { categories });
  }
}

export default ProductController;
