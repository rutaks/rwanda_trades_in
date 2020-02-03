import Category from "../models/category.model";
import validate from "../helpers/validators";

class CategoryClass {
  static async addCategory(req, res) {
    const { name } = req.body;
    const { value, error } = validate.category(req.body);

    if (error) {
      return sendErrorMessage(
        res,
        error.details[0].message,
        value,
        "add-category"
      );
    }
    try {
      const foundCategory = await Category.find({ name: name });
      if (foundCategory.length > 0) {
        return sendErrorMessage(
          res,
          "Category Already Exists",
          value,
          "add-category"
        );
      }
      const category = new Category({ name: name });
      category.save();
      req.flash("success", "Category Created");
      return res.redirect("/admin/categories");
    } catch (error) {
      throw error;
    }
  }

  static async modifyCategory(req, res) {
    const { categoryId } = req.params;
    const { name, status } = req.body;
    const { value, error } = validate.category(req.body);

    if (error) {
      return sendErrorMessage(
        res,
        error.details[0].message,
        value,
        "modify-category"
      );
    }
    try {
      let foundCategory = await Category.findById(categoryId);
      if (!foundCategory) {
        return sendErrorMessage(
          res,
          "Category Not Found",
          value,
          "modify-category"
        );
      }
      foundCategory.name = name;
      foundCategory.status = status == "active" ? true : false;
      foundCategory.save();
      req.flash("success", "Category Modified");
      return res.redirect("/admin/categories");
    } catch (error) {
      throw error;
    }
  }
  static async removeCategory(req, res) {
    const { categoryId } = req.params;
    try {
      let foundCategory = await Category.findById(categoryId);
      if (!foundCategory) {
        req.flash("error", "Category Not Found");
        return res.redirect("/admin/categories");
      }
      await Category.findOneAndDelete({ _id: categoryId });
      req.flash("success", "Category Removed Successfully");
      return res.redirect("/admin/categories");
    } catch (error) {
      throw error;
    }
  }

  static async getAllCategories(req, res) {
    try {
      const categories = await Category.find();
      res.render("server/partials/categories/view-all-categories", {
        categories: categories
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAddCategoryPage(req, res) {
    res.render("server/partials/categories/add-category");
  }

  static async getModifyCategoryPage(req, res) {
    try {
      const { categoryId } = req.params;
      const foundCategory = await Category.findById(categoryId);
      res.render("server/partials/categories/modify-category", {
        category: foundCategory
      });
    } catch (error) {
      throw error;
    }
  }
}

const sendErrorMessage = (res, message, fields, route) => {
  return res.render(`server/partials/categories/${route}`, {
    previousInput: fields,
    error: message
  });
};

export default CategoryClass;
