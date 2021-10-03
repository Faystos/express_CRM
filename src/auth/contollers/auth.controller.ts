import {Request, Response} from 'express';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UserModel } from '../models/user.model';
import { errorHandler } from '../../utils/errorHandler';
import { UserInterface } from '../types/user.interface';
import { jwtEnvironment } from '../../environments/jwt.environment';

export class AuthController {
  timeLifeToken = 60 * 60;
  login = async (req: Request, res: Response): Promise<void> => {
    // Проверяем есть ли введенный email в базе.
    const candidate: UserInterface = await UserModel.findOne({ email: req.body.email });

    if (!candidate) {
      // Если такого email`a нет выбрасываем ошибку.
      res.status(404).json({
        errorMessage: 'Email не найден!'
      });
    } else {
      // Проверяем пароль на совпадение.
      const passwordResult = compareSync(req.body.password, candidate.password);
      if (!passwordResult) {
        // Если пароль не совпадает выдаем ошибку.
        res.status(401).json({
          errorMessage: 'Не верный пароль!'
        });
      } else {
        // Если пароль совпадает генерируем токен.
        const token = sign({
          email: candidate.email,
          _id: candidate._id
        }, jwtEnvironment.SECRET_JWT, {
          expiresIn: this.timeLifeToken
        });
        // Отправляем токен.
        res.status(200).json({
          token: `Token ${token}`
        });
      }
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {
    // Проверяем есть ли введенный email в базе.
    const candidate: UserInterface = await UserModel.findOne({ email: req.body.email });

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
