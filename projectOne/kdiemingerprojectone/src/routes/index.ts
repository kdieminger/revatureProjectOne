import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('../public/index.html');
});

export default router;
