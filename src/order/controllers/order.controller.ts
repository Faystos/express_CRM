import { Response } from 'express';

import { OrderModel } from '../models/order.model';
import { errorHandler } from '../../utils/errorHandler';
import { RequestInterface } from '../../types/request.interface';
import { QueryInterface } from '../types/query.interface';

export class OrderController {
  getOrders = async (req: RequestInterface, res: Response): Promise<void> => {
    const query: QueryInterface = {
      user: req.user._id
    };

    // Запрос по дате старта
    if (req.query.start) {
      query.date = {
        // значение >=
        $gte: req.query.start
      };
    }

    // Запрос по дате конца
    if (req.query.end) {
      if (!query.date) {
        query.date = {}
      }
      query.date['$lte'] = req.query.end;
    }

    // Запрос по order
    if (req.query.order) {
      query.order = +req.query.order
    }

    try {
      const allOrders = await OrderModel.find(() => query)
        .sort({ date: -1 })
        .skip(+req.query.offset)
        .limit(+req.query.limit);

      res.status(200).json({
        allOrders
      });
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
