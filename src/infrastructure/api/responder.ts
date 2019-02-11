import { Response } from 'express';
import { ErrEither} from "../types/ErrEither";

export default <T>(res: Response, result: ErrEither<T>): ErrEither<T> => {

  return result;
}
