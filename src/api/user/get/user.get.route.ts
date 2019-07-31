import { Request, Response, NextFunction } from 'express';
import R from 'ramda';
import { Errable } from '../../../infrastructure/types/Errable';
import { RouteDef } from '../../../infrastructure/types/RouteDef';
import responder from '../../../infrastructure/api/responder';

import transformDto from './user.get.transformDto';
import validate from './user.get.validate';
import usecase from './user.get.usecase';
import {Dto} from "./user.get.types";
import httpError from "../../../utils/api/httpError";

type ReqVars = void;
type Resp = Dto;

const userGetRoute: RouteDef<ReqVars, Resp> = {
  method: 'get',
  path: '/',
  // middleware: [],
  // weight: 0,
  controller: (req: Request, res: Response, next: NextFunction): Promise<Errable<Resp>> => {
    // var testErr = httpError('m', 400);
    // usecase(testErr);

    // promisePipeline
    // return promisePipeline([
    //   transformDto,
    //   validate,
    //   authenticate,
    //   authorize(permissionModel),
    //   usecase,
    //   successResponder
    // ], errorResponder);
    //
    return Promise.resolve(req)
      .then(transformDto)
      .then(validate) // optional validation
      // .then(authenticate)
      // .then(authorize(permissionModel))
        // -> { user, dto }
      .then(usecase)
      .then(responder(res))
      .catch((e) => {
        next(e);
        return e;
      });
  },
};

export default userGetRoute;
