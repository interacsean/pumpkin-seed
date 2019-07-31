import {NextFunction, Request, Response} from "express";
import responder from "../../infrastructure/api/responder";
import httpError from "../../utils/api/httpError";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  responder(res)(httpError('Unexpected error', 500));
}
