import { Application, Router } from 'express';
import fs from 'fs';
import { join } from 'path';
import { reportError } from '../services';
import { RouteDef } from '../infrastructure/types/RouteDef';
import withErrorGuard from '../infrastructure/api/withErrorGuard';
import site from "../config/site";

const forEachDirIn = (source: string, cb: (string) => void) => {
  fs.readdirSync(source)
    .filter(f => fs.statSync(join(source, f)).isDirectory())
    .forEach(cb);
};

export default function routes(app: Application): void {
  console.log(`Search for routes under \`${__dirname}\``);
  const source = __dirname;
  const excludes: string[] = ['common'];

  const basePath = site.API_VERSION;

  try {
    forEachDirIn(source, (dir: string) => {
      if (excludes.includes(dir)) return;

      const dirRouter = Router();
      forEachDirIn(join(source, dir), (subdir: string) => {
        if (fs.existsSync(join(source, dir, subdir, `${dir}.${subdir}.route.ts`))) {
          import(join(source, dir, subdir, `${dir}.${subdir}.route.ts`))
            .then(({ default: routeDef }: { default: RouteDef<any, any> }) => {
              // todo ensure leading slash is correct:
              const correctedRoutePath = routeDef.path[0] === '/'
                ? routeDef.path
                : `/${routeDef.path}`;

              console.log(`Defining route: ${routeDef.method}:/${basePath}/${dir}${correctedRoutePath}`);
              //
              dirRouter[routeDef.method](
                routeDef.path,
                ...(Array.isArray(routeDef.middleware) ? routeDef.middleware : []),
                withErrorGuard(routeDef.controller),
              );
            })
            .catch((err) => {
              throw new Error(err);
            });
        }
      });
      app.use(`/${basePath}/${dir}`, dirRouter);
    });

  } catch (err) {
    console.log('caught the error');
    reportError(err);
  }
};
