import { Application, Router } from 'express';
import fs from 'fs';
import { join } from 'path';
import { reportError } from '../services';
import {RouteDef} from '../infrastructure/types/RouteDef';

const forEachDirIn = (source: string, cb: (string) => void) => {
  fs.readdirSync(source)
    .filter(f => fs.statSync(join(source, f)).isDirectory())
    .forEach(cb);
};

export default function routes(app: Application): void {
  console.log(`Defining routes found under ${__dirname}`);
  const source = __dirname;
  const excludes: string[] = ['common'];

  try {
    forEachDirIn(source, (dir: string) => {
      if (excludes.includes(dir)) return;

      const dirRouter = Router();
      forEachDirIn(join(source, dir), (subdir: string) => {
        if (fs.existsSync(join(source, dir, subdir, 'route.ts'))) {
          import(join(source, dir, subdir, 'route.ts'))
            .then(({ default: routeDef }: { default: RouteDef<any, any> }) => {
              console.log(`Defining route: ${routeDef.method}:${routeDef.path}`);
              dirRouter[routeDef.method](routeDef.path, routeDef.controller);
            })
            .catch((err) => {
              throw new Error(err);
            });
        }
      });
      // todo: /v1 should be parameterised outside of this
      app.use(`/v1/${dir}`, dirRouter);
    });

  } catch (err) {
    console.log('caught the error');
    reportError(err);
  }
};
