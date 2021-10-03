import {Request, Response} from 'express';
import { genSaltSync, hashSync } from 'bcryptjs';

import { UserModel } from '../models/user.model';
import { errorHandler } from '../../utils/errorHandler';

export class AuthController {
  login = (req: Request, res: Response) => {
    res.status(200).json({
      login: {
        email: req.body.email,
        password: req.body.password
      }
    });
  };

  register = async (req: Request, res: Response): Promise<void> => {
    // Проверяем есть ли введенный email в базе.
    const candidate = await UserModel.findOne({ email: req.body.email });

    if (candidate) {
      // Если есть выбрасываем ошибку
      res.status(409).json({
        errorMessage: 'Email уже зарегестрирован!'
      });
    } else {
      // если нет хешируем введнный пароль, создаем нового user и сохраняем в базе.

      // Хешируем пароль
      const salt = genSaltSync(10);
      const password = hashSync(req.body.password, salt);

      // Создаем нового user.
      const newUser = new UserModel({
        email: req.body.email,
        password
      });

      try {
        // если нет проблем со связью с бд сохраняем нового user в базу.
        await newUser.save();
        res.status(201).json({
          successMessage: 'Регистрация успешно завершена!'
        })
      } catch (err) {
        // Если есть проблемы со связью с бд обрабатываем ошибку.
        errorHandler(res, err);
      }
    }
  };
}
