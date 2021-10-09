import { Request, Response } from 'express';

import { PositionModel } from '../models/position.model';
import { errorHandler } from '../../utils/errorHandler';
import { PositionInterface } from '../types/position.interface';
import {RequestInterface} from "../../types/request.interface";

export class PositionController {
  getPosition = async (req: RequestInterface, res: Response): Promise<void> => {
    try {
      const allPositions: PositionInterface[] = await PositionModel.find(() => ({
        category: req.params.categoryId,
        user: req.user._id
      }));
      res.status(200).json(allPositions);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  createPosition = async (req: RequestInterface, res: Response): Promise<void> => {
    try {
      await new PositionModel({
        name: req.body.name,
        cost: req.body. cost,
        category: req.body.category,
        user: req.user._id
      }).save();
    } catch (err) {
      errorHandler(res, err);
    }
  };

  patchPosition = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatePosition: PositionInterface = await  PositionModel.findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          $set: req.body},
        {
          new: true
        }
      );
      res.status(200).json({
        position: updatePosition,
        accessMessage: "Позиция успешно изменена"
      });
    } catch (err) {
      errorHandler(res, err);
    }
  };

  deletePosition = async (req: Request, res: Response): Promise<void> => {
    try {
      await PositionModel.remove({ _id: req.params.id });
      res.status(200).json({
        accessMessage: "Позиция успешно удалена!"
      });
    } catch (err) {
      errorHandler(res, err);
    }
  };
}
