import { Request, Response } from 'express';
import { ErrEither } from './ErrEither';

type RequstOfQ = Request; // todo: unpack Q, or have Route take Qbody, Qparams, etc

export type Controller<Q, S> = (req: RequestOf<Q>, res: Response) => ErrEither<S> | Promise<ErrEither<S>>;
