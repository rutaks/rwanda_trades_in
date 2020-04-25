import Router from "express";
import productRequestController from "../../controllers/server/productRequest.controller";

const router = Router();

router.get("/", productRequestController.getAllProductRequests);

export default router;
