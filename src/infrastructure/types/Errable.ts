import { HttpError } from '../HttpError';

export type Errable<T> = HttpError | T;
