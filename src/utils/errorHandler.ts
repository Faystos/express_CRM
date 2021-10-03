import { Response } from 'express';

export function errorHandler (res: Response, err: Error) {
  res.status(500).json({
    errorMessage: err.message ? err.message : err,
  });
}
