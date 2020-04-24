import categoryQuery from "../../helpers/categoryQueries";

const baseUrl = "client";

class CategoryController {
  static getFromAllDepartments(req, res) {
    return res.render(`${baseUrl}/shop-items`);
  }
  static async getByDepartment(req, res) {
    const { categoryId } = req.params;
    const resPerPage = 9; // results per page
    const page = req.params.page || 1; // Page
    const { foundProducts, count } = await categoryQuery.getDepartmentProducts(
      categoryId,
      page
    );
    return sendPage(
      res,
      {
        products: foundProducts,
        currentPage: page,
        pages: Math.ceil(count / resPerPage),
        numOfResults: count,
        categoryId: categoryId
      },
      "shop-items"
    );
  }
}

const sendPage = async (res, data, pageName) => {
  const categories = await categoryQuery.getAllCategories();
  data.categories = categories;
  res.render(`${baseUrl}/${pageName}`, data);
};

export default CategoryController;
