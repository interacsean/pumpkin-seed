import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import cookieParser from 'cookie-parser';
import swaggerify from './infrastructure/swagger';
import l from './infrastructure/logger';

export default function(routes: (app: Application) => void, port: string | number) {
  const app = express();

  const root = path.normalize(__dirname + '/../..');
  app.set('appPath', root + 'client');
  app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
  app.use(cookieParser(process.env.SESSION_SECRET));
  app.use(express.static(`${root}/public`));

  // todo: put in swagger bootstrap
  swaggerify(app, routes);

  const welcome = port => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} on port: ${port}}`);
  http.createServer(app).listen(port, welcome(port));
}
