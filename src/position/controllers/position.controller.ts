import { Request, Response } from 'express';

export class PositionController {

  getPosition = (req: Request, res: Response): void => {
    const category = req.params.category;
    res.status(200).json({
      message: `Получить позицию с категорией ${category}.`
    });
  };

  createPosition = (req: Request, res: Response): void => {
    res.status(200).json({
      message: 'Создать новую позицию.'
    });
  };

  patchPosition = (req: Request, res: Response): void => {
    const id = req.params.id;
    res.status(200).json({
      message: `Редактировать позицию с id:${id}`
    });
  };

  deletePosition = (req: Request, res: Response): void => {
    const id = req.params.id;
    res.status(200).json({
      message: `Удалить позицию с id:${id}`
    });
  };
}
