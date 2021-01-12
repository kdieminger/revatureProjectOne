import express from 'express';
import * as user from './user';
import logger from '../log';
import publicDir from '../constants';
import userService from './user.service';
import { supervisorRequest } from '../request/request';
import requestService from '../request/request.service';

const router = express.Router();

/* GET users listing. */
router.get('/login', function (req: any, res, next) {
  // If I'm already logged in, why would I log in again?
  if (req.session.user) {
    console.log(req.session.user);
    res.redirect('/');
  }
  res.sendFile('login.html', { root: publicDir });
});

router.get('/', (req: any, res, next) => {
  let u = { ...req.session.user };
  logger.debug(u);
  //delete u.password;
  res.send(JSON.stringify(u));
});

// Legacy route, do not use.
router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => logger.error(err));
  res.redirect('/');
});

// Much more restful
router.delete('/', (req, res, next) => {
  req.session.destroy((err) => logger.error(err));
  res.sendStatus(204);
})

router.post('/', function (req: any, res, next) {
  logger.debug(req.body);
  user.login(req.body.name, req.body.password).then((user) => {
    if (user === null) {
      res.sendStatus(401);
    }
    req.session.user = user;
    res.send(JSON.stringify(user))
  });
});

router.get('/:id', function (req, res, next) {
  userService.getUsersBySupervisor(req.params.id).then((arr) => {
    console.log(arr);
    res.send(JSON.stringify(arr));
  })
})

router.get('/:id/requests', function(req, res, next) {
  requestService.getRequestByName(req.params.id).then((requests) => {
      res.send(JSON.stringify(requests));
  })
})

export default router;
