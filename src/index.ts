import './infrastructure/env';
import Server from './app';
import routes from './api/routes';

const port = parseInt(process.env.PORT);

Server(routes, port);
