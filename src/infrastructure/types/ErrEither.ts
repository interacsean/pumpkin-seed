import { Either } from 'monet';

export type ErrEither<T> = Either<HTTPError, T>;
