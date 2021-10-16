import { Request, Response } from 'express';
import fs from 'fs';

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

  createCategory = async (req: RequestInterface, res: Response): Promise<void> => {
    const newCategory = new CategoryModel({
      name: req.body.name,
      user: req.user._id,
      imageSrc: req.file ? req.file.filename : ''
    });
    try {
      await newCategory.save();
      res.status(201).json({
        newCategory,
        successMessage: 'Категория успешно создана!'
      });
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

  patchCategory = async (req: RequestInterface, res: Response): Promise<void> => {
    const updated: { name: string,  imageSrc?: string} = {
      name: req.body.name
    };
    if (req.file) {
      updated.imageSrc = req.file.filename;
    }
    try {
      // ищем категорию по id
      const category = await CategoryModel.findById(req.params.id);
      // если файл приходит, проверяем совпадают ли имена, если нет то удаляем старый файл
      if(req.file && req.file.filename !== category.imageSrc) {
        fs.unlinkSync(`dist/uploads/${category.imageSrc}`);
      }

      const updateCategory = await CategoryModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updated },
        { new: true }
      );
      res.status(200).json({
        updateCategory,
        successMessage: 'Категория успешно изменена!'
      });
    } catch (err) {
      errorHandler(res, err);
    }
  };
}
