import { Response } from "express";
import responder from "../../infrastructure/api/responder";
import httpError, {HttpError} from "../../infrastructure/HttpError";

export default function errorResponder(res: Response) {
  return (errorThrown: any): HttpError => {
    const unexpError = httpError(
      'Unexpected error',
      { data: errorThrown },
    );
    responder(res, 'Unexpected error')(unexpError);
    return unexpError;
  };
}
