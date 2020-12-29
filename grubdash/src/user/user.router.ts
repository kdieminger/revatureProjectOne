import express from 'express';
import path from 'path';
import * as user from './user';
import logger from '../log';
import publicDir from '../constant';

const router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.sendFile('login.html', {root: publicDir});
});

router.post('/', function(req, res, next) {
  logger.debug(req.body);
  user.login(req.body.username, req.body.password).then((user) => {
    res.send(`${user?.name}, you have $${user?.money}`)
  })
});
export default router;
