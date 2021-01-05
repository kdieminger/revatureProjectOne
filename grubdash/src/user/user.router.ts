import express from 'express';
import * as user from './user';
import logger from '../log';
import publicDir from '../constant';

const router = express.Router();

/* GET users listing. */
router.get('/login', function(req: any, res, next) {
  // If I'm already logged in, why would I log in again?
  if(req.session.user) {
    console.log(req.session.user);
    res.redirect('/');
  }
  res.sendFile('login.html', {root: publicDir});
});

router.get('/', (req: any, res, next) => {
  let u = {...req.session.user};
  delete u.password;
  res.send(JSON.stringify(u));
});

router.get('/logout', (req, res, next) => {
  req.session.destroy((err)=> logger.error(err));
  res.redirect('/');
});


router.post('/', function(req: any, res, next) {
  logger.debug(req.body);
  user.login(req.body.username, req.body.password).then((user) => {
    req.session.user = user;
    res.send(`${user?.name}, you have $${user?.money}`)
  })
});

export default router;
