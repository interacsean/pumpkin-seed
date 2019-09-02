import { Request, Response, NextFunction } from 'express';
import R from 'ramda';
import { Errable } from '../../../infrastructure/types/Errable';
import { RouteDef } from '../../../infrastructure/types/RouteDef';
import responder from '../../../infrastructure/api/responder';

import transformDto from './user.get.transformDto';
import validate from './user.get.validate';
import usecase from './user.get.usecase';
import { Dto } from "./user.get.types";
import errorResponder from '../../common/errorResponder';
import {HttpError} from "../../../infrastructure/HttpError";

type ReqVars = void;
type Resp = Dto;

const userGetRoute: RouteDef<ReqVars, Resp> = {
  method: 'get',
  path: '/:id',
  // middleware: [],
  // weight: 0,
  controller: (req: Request, res: Response, next: NextFunction): Promise<Errable<Resp>> => {
    return Promise.resolve(transformDto(req))
      .then(validate) // optional validation
      // .then(authenticate)
      // .then(authorize(permissionModel))
      // -> { user, dto }
      .then(validated => (validated instanceof HttpError)
        ? validated
        : usecase(validated)
      )
      .then(responder(res))
      .catch(errorResponder(res));
  },
};

export default userGetRoute;
