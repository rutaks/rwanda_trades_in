import ProductRequest from "../../models/productRequest.model";

const baseUrl = "server/partials/product-requests";
class ProductRequestController {
  static async getAllProductRequests(req, res) {
    const foundProductRequests = await ProductRequest.find().populate(
      "product"
    );
    res.render(`${baseUrl}/view-all-product-requests`, {
      productRequests: foundProductRequests,
    });
  }
}

export default ProductRequestController;
