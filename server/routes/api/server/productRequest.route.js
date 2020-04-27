import Router from "express";
import productRequestController from "../../../controllers/api/ProductRequests.controller";

const router = Router();

router.get("/accepted", productRequestController.getTopAcceptedCompanies);
router.get("/rejected", productRequestController.getTopRejectedCompanies);
router.get(
  "/requests/total/by-month",
  productRequestController.getMonthlyRequests
);

export default router;
