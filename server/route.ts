import * as express from 'express';

import UserCtr from './controller/user';

export default function setRoutes(app) {
  const router = express.Router();

  const testCtr = new UserCtr();

  // user
  app.route('/test').get(testCtr.test);

}