import {Request, Response} from 'express';

import { OrderModel } from '../models/order.model';
import { errorHandler } from '../../utils/errorHandler';
import { OrderInterface } from '../types/order.interface';
import { RequestInterface } from '../../types/request.interface';

export class OrderController {
  getOrder = async (req: RequestInterface, res: Response): Promise<void> => {
    try {

    } catch (err) {
      errorHandler(res, err)
    }
  };

  createOrder = async (req: RequestInterface, res: Response): Promise<void> => {
    try {
      const lasOrder = await OrderModel.findOne(() => { user: req.user._id })
          .sort({ date: -1 });
      const maxOrder = lasOrder ? lasOrder.order : 0;

      const newOrder = new OrderModel({
        list: req.body.list,
        user: req.user._id,
        order: maxOrder + 1
      }).save();

      res.status(201).json({
        newOrder,
        successMessage: 'Заказ успешно создан!'
      });
    } catch (err) {
      errorHandler(res, err)
    }
  };
}
