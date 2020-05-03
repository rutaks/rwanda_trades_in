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
  static async searchProduct(req, res) {
    const { searchQuery } = req.body;
    const resPerPage = 9; // results per page
    const page = req.params.page || 1; // Page
    const {
      foundProducts,
      count,
    } = await await ProductQueries.getDepartmentProductsByName(
      searchQuery,
      page
    );

    return sendPage(
      res,
      {
        products: foundProducts,
        currentPage: page,
        pages: Math.ceil(count / resPerPage),
        numOfResults: count,
        searchQuery: searchQuery,
      },
      "client",
      "/query-results-search"
    );
  }
}

const sendPage = async (res, data, baseUrl, pageName) => {
  const categories = await CategoryQueries.getAllCategories();
  data.categories = categories;
  res.render(`${baseUrl}/${pageName}`, data);
};

export default ProductController;
