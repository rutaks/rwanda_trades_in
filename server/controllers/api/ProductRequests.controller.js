import ProductRequestQueries from "../../helpers/ProductRequestQueries";
import ResponseHelper from "../../helpers/ResponseHelper";

class ProductRequestsController {
  static async getTopAcceptedCompanies(req, res) {
    try {
      const topAcceptedProductRequests = await ProductRequestQueries.getTopAcceptedRequests();
      ResponseHelper.send201(res, "Requests Received Successfully", {
        requests: topAcceptedProductRequests,
      });
    } catch (error) {
      ResponseHelper.send404(
        res,
        "Could not make action",
        "PRODUCT_REQUESTS_API"
      );
    }
  }

  static async getTopRejectedCompanies(req, res) {
    try {
      const topRejectedProductRequests = await ProductRequestQueries.getTopRejectedRequests();
      ResponseHelper.send201(res, "Requests Received Successfully", {
        requests: topRejectedProductRequests,
      });
    } catch (error) {
      ResponseHelper.send404(
        res,
        "Could not make action",
        "PRODUCT_REQUESTS_API"
      );
    }
  }
}

export default ProductRequestsController;
