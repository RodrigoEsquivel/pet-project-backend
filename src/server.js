import cors from 'cors';
import xss from 'xss-clean';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import httpStatus from 'http-status';
import compression from 'compression';
import routes from './routes/index.js';
import { log } from './util/general.js';
import { port, security, serverconfig } from './configuration/config.js';

const app = express();
serverconfig(app, security, port);
app.use(xss());
app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('combined'));
app.use('/', routes);
app.use((req, res) => {
  log.debug(req.path, req.params, req.method);
  log.debug(JSON.stringify(req.body));
  res.status(httpStatus.NOT_FOUND).send(httpStatus[httpStatus.NOT_FOUND]);
});

log.info('* * * API SERVER * * * ');

export default app;