import {Response, Request, NextFunction} from 'express';
import {Controller} from "../types/Controller";
import {RequestOf} from "../types/RequestOf";
import responder from "./responder";

export default function withErrorGuard<T, U>(controller: Controller<T, U>) {
  return (req: RequestOf<T>, res: Response, next: NextFunction) => {
    try {
      controller(req, res, next);
    } catch (e) {
      // todo: check for production environment:
      //  - if dev, provide useful details in response
      //  - if prod, suppress cause of error
      //  - if prod, log with error service
      responder(res, 'An unknown error occurred.')(e);
    }
  }
}
