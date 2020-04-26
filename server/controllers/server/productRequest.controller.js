import ProductRequest from "../../models/productRequest.model";
import Product from "../../models/product.model";

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

  static async changeProductRequestStatus(req, res) {
    try {
      const { status } = req.query;
      const { productRequestId } = req.params;
      const foundProductRequest = await ProductRequest.findById(
        productRequestId
      );
      if (foundProductRequest === "null" || !foundProductRequest) {
        req.flash("error", "Product Request Was Not Found");
        res.redirect("/admin/product-requests");
      }
      const foundProduct = await Product.findById(foundProductRequest.product);
      if (status === "ACCEPTED") foundProduct.successfulRequests += 1;
      if (status === "REJECTED") foundProduct.rejectedRequests += 1;
      foundProductRequest.status = status;
      foundProductRequest.save();
      foundProduct.save();
      req.flash(
        "success",
        `Request was ${status !== "REJECTED" ? "Approved" : "Rejected"}`
      );
      res.redirect("/admin/product-requests");
    } catch (error) {
      console.log("PRODUCT_REQUEST ~ ", error.message);
      res.flash("error", "Something Occurred, Try again later");
      res.redirect("/admin/product-requests");
    }
  }
}

export default ProductRequestController;
