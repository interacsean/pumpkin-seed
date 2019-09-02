import { Response } from 'express';
import { Errable} from '../types/Errable';
import { HttpError } from '../HttpError';

export default <T>(res: Response, message?: string) => (result: Errable<T>): Errable<T> => {
  if (result instanceof HttpError) {
    const { status, message: errMessage, data, token } = result;
    const useStatus = status || 500;

    res
      .status(useStatus)
      .send({
        status: useStatus,
        message: errMessage,
        errors: data || null,
        ...(token ? { token } : {}),
      });
  } else {
    const { token, ...data } = result as T & { token?: string };
    res
      .status(200)
      .send({
        data,
        message: message || 'Success',
        ...(token ? { token } : {}),
      });
  }
  return result;
}
