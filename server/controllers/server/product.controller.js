import Product from "../../models/product.model";
import Category from "../../models/category.model";
import validate from "../../helpers/validators";
import FileUtil from "../../helpers/fileUtil";
import Validator from "../../helpers/validators";

const baseUrl = "server/partials/products";
class productController {
  static async addProduct(req, res) {
    let errorMessage = null;
    const {
      name,
      currency,
      price,
      category,
      description,
      discountDeadline,
      discountPercent,
    } = req.body;

    const { value, error } = validate.product(req.body);
    if (!Validator.isValidPicture(req.files.mainPicture)) {
      errorMessage = "Main Image Is Not Valid";
    }
    if (!Validator.isValidPicture(req.files.secondPicture)) {
      errorMessage = "Second Image Is Not Valid";
    }
    if (!Validator.isValidPicture(req.files.thirdPicture)) {
      errorMessage = "Third Image Is Not Valid";
    }
    if (!Validator.isValidPicture(req.files.fourthPicture)) {
      errorMessage = "Fourth Image Is Not Valid";
    }
    if (errorMessage) {
      return await sendErrorMessage(res, errorMessage, value, "/add-product");
    }

    const images = await FileUtil.uploadProductImages(req.files);

    if (!images.mainPicture) errorMessage = "Main Image Is Not Valid";
    if (!images.secondPicture) errorMessage = "Second Image Is Not Valid";
    if (!images.thirdPicture) errorMessage = "Third Image Is Not Valid";
    if (!images.fourthPicture) errorMessage = "Fourth Image Is Not Valid";

    if (error) errorMessage = error.details[0].message;
    if (errorMessage) {
      return await sendErrorMessage(res, errorMessage, value, "/add-product");
    }

    const foundProduct = await Product.find({ name: name });
    if (foundProduct.length > 0) {
      return await sendErrorMessage(
        res,
        "Product's Name Is Already Taken",
        value,
        "add-product"
      );
    }
    const product = new Product({
      name: name,
      currency: currency,
      price: price,
      description: description,
      category: category,
      mainPicture: images.mainPicture.url,
      secondPicture: images.secondPicture.url,
      thirdPicture: images.thirdPicture.url,
      fourthPicture: images.fourthPicture.url,
      discountPercent: discountPercent,
      discountDeadline: discountDeadline,
    });
    product.save();
    req.flash("success", "Product Created");
    return res.redirect("/admin/products");
  }

  static async getAllProducts(req, res) {
    const products = await Product.find().populate("category");
    res.render(`${baseUrl}/view-all-products`, {
      products: products,
    });
  }

  static async getAddProductPage(req, res) {
    const categories = await Category.find();
    return res.render(`${baseUrl}/add-product`, { categories: categories });
  }
}

const sendErrorMessage = async (res, message, fields, route) => {
  const categories = await Category.find();
  return res.render(`${baseUrl}${route}`, {
    previousInput: fields,
    error: message,
    categories: categories,
  });
};

export default productController;
