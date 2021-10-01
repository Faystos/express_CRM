import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

const categoryController: CategoryController = new CategoryController();
export const categoryRoute: Router = Router();
categoryRoute.get('/categories', categoryController.getAllCategories);
categoryRoute.get('/category/:id', categoryController.getCategory);
categoryRoute.post('/category', categoryController.createCategory);
categoryRoute.delete('/category/:id', categoryController.deleteCategory);
categoryRoute.patch('/category/:id', categoryController.patchCategory);
