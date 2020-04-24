import Router from "express";
import categoryController from "../../controllers/client/category.controller";

const router = Router();

router.get("/", categoryController.getFromAllDepartments);
router.get("/:categoryId", categoryController.getByDepartment);
router.get("/name/:categoryName", categoryController.getByDepartmentName);

export default router;
