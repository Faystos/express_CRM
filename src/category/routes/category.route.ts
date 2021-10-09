import { Router } from 'express';
import passport from 'passport';
import { CategoryController } from '../controllers/category.controller';

const passportPolice = passport.authenticate('jwt', { session: false });
const categoryController: CategoryController = new CategoryController();
export const categoryRoute: Router = Router();
categoryRoute.get('/categories', passportPolice, categoryController.getAllCategories);
categoryRoute.get('/category/:id', passportPolice ,categoryController.getCategory);
categoryRoute.post('/category', passportPolice, categoryController.createCategory);
categoryRoute.delete('/category/:id', passportPolice, categoryController.deleteCategory);
categoryRoute.patch('/category/:id', passportPolice, categoryController.patchCategory);
