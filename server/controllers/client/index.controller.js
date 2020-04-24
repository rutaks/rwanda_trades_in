import categoryQuery from "../../helpers/categoryQueries";

const baseUrl = "client";

class IndexController {
  static async getHomePage(req, res) {
    const {
      menProducts,
      womenProducts
    } = await categoryQuery.getHomePageComponents();
    const categories = await categoryQuery.getAllCategories();
    return res.render(`${baseUrl}/home`, {
      categories: categories,
      menProducts: menProducts,
      womenProducts: womenProducts
    });
  }
}

export default IndexController;