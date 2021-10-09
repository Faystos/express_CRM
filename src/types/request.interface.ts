import { Request } from 'express';
import {UserInterface} from "../auth/types/user.interface";

export interface RequestInterface extends Request {
    user?: UserInterface;
}

