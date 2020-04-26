import CategoryQueries from "../../helpers/categoryQueries";
import ProductQueries from "../../helpers/productQueries";

// const baseUrl = "client/";
class ProductController {
  static async getProduct(req, res) {
    const { productId } = req.params;
    const categories = await CategoryQueries.getAllCategories();
    const foundProduct = await ProductQueries.getProductByProductId(productId);
    const similarProducts = await ProductQueries.getProductsByCategoryId(
      foundProduct.category
    );
    return res.render("client/shop-item", {
      categories,
      foundProduct,
      similarProducts,
    });
  }
}

export default ProductController;
