import { Request, Response } from 'express';

export class CategoryController {
  getAllCategories = (req: Request, res: Response): void => {
    res.status(200).json({
      message: 'Получить все категории.'
    });
  };

  getCategory = (req: Request, res: Response): void => {
    const id = req.params.id;
    res.status(200).json({
      message: `Получить категорию с id:${id}`
    });
  };

  createCategory = (req: Request, res: Response): void => {
    res.status(200).json({
      message: 'Создать новую категорию'
    });
  };

  deleteCategory = (req: Request, res: Response): void => {
    const id = req.params.id;
    res.status(200).json({
      message: `Удалить категорию с id:${id}`
    });
  };

  patchCategory = (req: Request, res: Response): void => {
    const id = req.params.id;
    res.status(200).json({
      message: `Редактировать категорию с id:${id}`
    });
  };
}
