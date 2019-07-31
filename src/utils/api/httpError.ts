import {HttpError} from "../../infrastructure/types/HttpError";

export class IHttpError<E> extends Error {
  public status;
  public data;

  public constructor(m: string, status: number, data?: E) {
    super(m);

    this.status = status || 400;
    this.data = data;

    Object.setPrototypeOf(this, IHttpError.prototype);
  }
}

export default function httpError<E>(m: string, status?: number, data?: E): HttpError {
  return new IHttpError(m, status, data);
}
