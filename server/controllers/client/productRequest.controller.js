import ProductRequest from "../../models/productRequest.model";
import validate from "../../helpers/validators";

class ProductRequestController {
  static async sendProductRequest(req, res) {
    const { productId } = req.params;
    const { value, error } = validate.productRequest(req.body);
    if (error) {
      console.error("PRODUCT_REQUEST: ", error.details[0].message);
      return req.flash("error", "Could Not Send Request, try again later :)");
    }
    try {
      const productRequest = new ProductRequest(value);
      req.flash(
        "success",
        "Your Request Was Sent, We will contact you soon :)"
      );
      res.redirect(`/products/${productId}`);
      productRequest.save();
    } catch (error) {
      console.error("PRODUCT_REQUEST: ", error.message);
      req.flash("error", "Could Not Send Request, try again later :)");
      res.redirect(`/products/${productId}`);
    }
  }
}

export default ProductRequestController;
