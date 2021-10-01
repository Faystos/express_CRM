import {Request, Response} from 'express';

export class OrderController {
  getOrder = (req: Request, res: Response) => {
    res.status(200).json({
      message: 'Гет запрос Order'
    });
  };

  createOrder = (req: Request, res: Response) => {
    res.status(200).json({
      message: 'новый Order успешно создан.'
    });
  };
}
