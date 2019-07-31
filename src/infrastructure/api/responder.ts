import { Response } from 'express';
import { HttpError } from '../types/HttpError';
import { Errable} from '../types/Errable';
import {IHttpError} from "../../utils/api/httpError";

// todo: use from Monax
const fork = <T, R>(
  errFn: (err: HttpError) => R,
  succFn: (val: T) => R,
) => (
  val: Errable<T>,
) => val instanceof IHttpError
  ? errFn(val as HttpError)
  : succFn(val as T);

export default <T>(res: Response, message?: string) => (result: Errable<T>): Errable<T> => {
  fork(
    ({ status, message: errMessage, data }: HttpError) =>
      res
        .status(status || 400)
        .send({
          status: status || 400,
          message: errMessage,
          errors: data || null,
        }),
    ({ token, ...data}: T & { token?: string }) => res
      .status(200)
      .send({
        data,
        message: message || 'Success',
        ...(token ? { token } : {}),
      })
  )(result);
  return result;
}
