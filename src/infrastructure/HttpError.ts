type ErrorData = {
  status?: number,
  data?: any,
  token?: string,
}

export class HttpError extends Error {
  status: number;
  data?: any;
  token?: string;

  constructor(message: string, metadata?: ErrorData) {
    super(message);

    const { status, data, token } = metadata;

    this.status = status || 500;
    if (data !== undefined) this.data = data;
    if (token !== undefined) this.token = token;
  }
}

export default function httpError(message: string, metadata?: ErrorData): HttpError {
  return new HttpError(message, metadata);
}
