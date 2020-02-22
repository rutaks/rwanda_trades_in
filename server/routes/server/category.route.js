import Router from "express";
import categoryController from "../../controllers/server/category.controller";

const router = Router();

router.get("/", categoryController.getAllCategories);
router.get("/new", categoryController.getAddCategoryPage);
router.post("/new", categoryController.addCategory);
router.get("/modify/:categoryId", categoryController.getModifyCategoryPage);
router.post("/modify/:categoryId", categoryController.modifyCategory);
router.get("/remove/:categoryId", categoryController.removeCategory);

export default router;
