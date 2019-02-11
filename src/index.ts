import './infrastructure/env';
import Server from './infrastructure/bootstrap';

const port = parseInt(process.env.PORT);

Server(port);
