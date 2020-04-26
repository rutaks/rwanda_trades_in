import Router from "express";
import productRequestController from "../../controllers/client/productRequest.controller";

const router = Router();

router.post("/:productId", productRequestController.sendProductRequest);

export default router;
