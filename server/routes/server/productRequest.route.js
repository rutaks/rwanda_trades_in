import Router from "express";
import productRequestController from "../../controllers/server/productRequest.controller";

const router = Router();

router.get("/", productRequestController.getAllProductRequests);
router.get(
  "/:productRequestId/change-status",
  productRequestController.changeProductRequestStatus
);

export default router;
