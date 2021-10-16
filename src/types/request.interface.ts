import { Request } from 'express';


import {UserInterface} from "../auth/types/user.interface";

export interface RequestInterface extends Request {
    user?: UserInterface;
    file?: FileInterface
}


interface FileInterface {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
 size: number;
}





