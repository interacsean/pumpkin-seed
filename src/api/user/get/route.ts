import { Request, Response } from 'express';
import { ErrEither } from '../../../infrastructure/types/ErrEither';
import { RouteDef } from '../../../infrastructure/types/RouteDef';
import responder from '../../../infrastructure/api/responder';

const route: RouteDef<void, string> = {
  method: 'get',
  path: '/',
  controller: (req: Request, res: Response): ErrEither<string> => {
    console.log('in user get');
    return responder(res, 'success');
  },
};

export default route;
