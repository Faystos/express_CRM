import { Request, Response } from 'express';

import { CategoryModel } from '../models/category.model';
import { PositionModel } from '../../position/models/position.model';
import { errorHandler } from '../../utils/errorHandler';
import { RequestInterface } from '../../types/request.interface';

export class CategoryController {
  getAllCategories = async (req: RequestInterface, res: Response): Promise<void> => {
    try {
      const allCategories = await CategoryModel.find(() => {
        user: req.user._id
      });
      res.status(200).json({
        allCategories
      });
    } catch (err) {
      errorHandler(res, err);
    }
  };

  getCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const category = await CategoryModel.findById(req.params.id);
      res.status(200).json({
        category
      });
    } catch (err) {
      errorHandler(res, err);
    }
  };

  createCategory = async (req: Request, res: Response): Promise<void> => {
    try {

    } catch (err) {
      errorHandler(res, err);
    }
  };

  deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      await CategoryModel.remove({
        _id: req.params.id
      });

      await PositionModel.remove({
        category: req.params.id
      });

      res.status(200).json({
        successMessage: 'Категория успешно удалена!'
      });
    } catch (err) {
      errorHandler(res, err);
    }
  };

  patchCategory = async (req: Request, res: Response): Promise<void> => {
    try {

    } catch (err) {
      errorHandler(res, err);
    }
  };
}
