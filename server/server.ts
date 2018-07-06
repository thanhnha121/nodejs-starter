import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';

var http = require("http");

import setRoutes from './route';
import config from './config';

const SERVER_PORT = 3100;
// mongo server host
const DB_BASE_URL = 'mongodb://127.0.0.1:27017/zamba-full';
// limit request size
const MAX_BODY_SIZE = 1024 * 1024 * 20;

const app = express();
app.use(bodyParser.json({ limit: MAX_BODY_SIZE, type: 'application/json' }));
// parse url
app.use(bodyParser.urlencoded({ extended: false }));
// using cookie parse
app.use(cookieParser());

mongoose.connect(DB_BASE_URL);
const db = mongoose.connection;
(<any>mongoose).Promise = global.Promise;

var restartServer = async () => {
	
	app.listen(SERVER_PORT, () => {
    console.log('PUSH MESSAGE API LISTENING ON PORT ' + SERVER_PORT);
  });

  await app.use('/*', async function (req, res, next) {
  	// config Access-Control-Allow-Origin
		config(req, res, next);
  });

}

db.once('open', () => {
  console.log('CONNECTED TO MONGODB');
  restartServer();
  setRoutes(app);
});

export { app };
