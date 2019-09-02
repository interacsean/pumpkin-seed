import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import routeCreator from '../api/routes';
import http from 'http';
import cookieParser from 'cookie-parser';
import swaggerify from './swagger';
import l from './logger';

type Config = {
  API_VERSION: string,
  API_DOMAIN: string,
  PORT: number,
  BASE_PATH: string,
}

export default function(siteConfig: Config) {
  const app = express();

  const root = path.normalize(__dirname + '/../..');
  app.set('appPath', root + 'client');
  app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
  app.use(cookieParser(process.env.SESSION_SECRET));
  app.use(express.static(`${root}/public`));

  // swaggerify(app, routeCreator);
  routeCreator(app);

  const welcome = port => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} on port: ${port}}`);
  http.createServer(app).listen(siteConfig.PORT, welcome(siteConfig.PORT));
}
