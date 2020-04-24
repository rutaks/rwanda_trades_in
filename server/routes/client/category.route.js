import Router from "express";
import categoryController from "../../controllers/client/category.controller";

const router = Router();

router.get("/", categoryController.getFromAllDepartments);
router.get("/:categoryId", categoryController.getByDepartment);

export default router;
