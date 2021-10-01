import {Request, Response} from 'express';

export class AuthController {
  login = (req: Request, res: Response) => {
    res.status(200).json({
      login: {
        email: req.body.email,
        password: req.body.password
      }
    });
  };

  register = (req: Request, res: Response) => {
    res.status(200).json({
      message: 'Регистрация успешно завершина!'
    });
  };
}
