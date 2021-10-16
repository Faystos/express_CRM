import { Router } from 'express';
import passport from 'passport';


import { CategoryController } from '../controllers/category.controller';
import { upload } from '../../middleware/upload';

const passportPolice = passport.authenticate('jwt', { session: false });
const categoryController: CategoryController = new CategoryController();
export const categoryRoute: Router = Router();
categoryRoute.get('/categories', passportPolice, categoryController.getAllCategories);
categoryRoute.get('/category/:id', passportPolice ,categoryController.getCategory);
categoryRoute.post('/category', passportPolice, upload.single('image'), categoryController.createCategory);
categoryRoute.delete('/category/:id', passportPolice, categoryController.deleteCategory);
categoryRoute.patch('/category/:id', passportPolice, upload.single('image'), categoryController.patchCategory);
