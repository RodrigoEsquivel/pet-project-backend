import fs from 'fs';
import path, {dirname} from 'path';
import http from 'http';
import { fileURLToPath } from 'url'
import dotenv from 'dotenv';


const port =  9100;
dotenv.config();
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sslpath = process.env.SSL_PATH
  ? process.env.SSL_PATH
  : path.join(__dirname, '..', 'ssl');
  
const privateKey = fs.readFileSync(path.join(sslpath, 'privkey.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(sslpath, 'cert.pem'), 'utf8');
const chainBundle = fs.readFileSync(path.join(sslpath, 'chain.pem'), 'utf8');

const security = {
    enablehttps: Boolean(process.env.ENABLE_HTTPS) || false,
    maxAge: Number(process.env.MAX_AGE),
    includeSubDomains: Boolean(process.env.INCLUDE_SUB_DOMAINS) || false,
    preload: Boolean(process.env.PRELOAD) || false,
    options: {
      key: privateKey,
      cert: certificate,
      ca: chainBundle,
      ciphers: [
        'ECDHE-RSA-AES256-SHA384',
        'DHE-RSA-AES256-SHA384',
        'ECDHE-RSA-AES256-SHA256',
        'DHE-RSA-AES256-SHA256',
        'ECDHE-RSA-AES128-SHA256',
        'DHE-RSA-AES128-SHA256',
        'HIGH',
        '!aNULL',
        '!eNULL',
        '!EXPORT',
        '!DES',
        '!RC4',
        '!MD5',
        '!PSK',
        '!SRP',
        '!CAMELLIA',
      ].join(':'),
    },
  };

  const serverconfig = (app, _security, _port) => {
    new http.Server(app).listen(9100);
    if (_security.enablehttps) {
      const { maxAge, includeSubDomains, preload } = _security;
      app.use(helmet.hsts({ maxAge, includeSubDomains, preload }));
      https.createServer(_security.options, app).listen(_port);
    }
  };

  const jwtSecretKey = process.env.JWT_SECRET_KEY || 'SECRETKEY';

  const mongoDBURI = process.env.MONGODB_URI || '';
  ;

export {port , security, serverconfig, jwtSecretKey, mongoDBURI};