import {NextFunction, Response} from 'express';
import { Errable } from './Errable';
import { RequestOf } from './RequestOf';
import { RequestVars } from './RequestVars';

export type Controller<ReqVars extends RequestVars, SuccessResponse> = (
  req: RequestOf<ReqVars>,
  res: Response,
  next: NextFunction,
) => Errable<SuccessResponse> | Promise<Errable<SuccessResponse>>;
