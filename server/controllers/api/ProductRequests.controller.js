import ProductRequestQueries from "../../helpers/ProductRequestQueries";
import ResponseHelper from "../../helpers/ResponseHelper";
import DateHelper from "../../helpers/DateHelper";

class ProductRequestsController {
  static async getTopAcceptedCompanies(req, res) {
    try {
      const topAcceptedProductRequests = await ProductRequestQueries.getTopAcceptedRequests();
      ResponseHelper.send200(res, "Requests Received Successfully", {
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
      ResponseHelper.send200(res, "Requests Received Successfully", {
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

  static async getMonthlyRequests(req, res) {
    try {
      let monthArr = [];
      for (let i = 4; i >= 0; i--) {
        const prevMonth = await ProductRequestQueries.getTotalRequestsCountByMonth(
          DateHelper.getMonthInterval(i)
        );
        monthArr.push(prevMonth);
      }

      ResponseHelper.send200(res, "Requests Received Successfully", {
        dates: monthArr,
      });
    } catch (error) {
      ResponseHelper.send404(
        res,
        "Could Not Make Request",
        "PRODUCT_REQUESTS_API"
      );
    }
  }
}

export default ProductRequestsController;
