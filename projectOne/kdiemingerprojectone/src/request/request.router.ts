import Express from 'express';
import logger from '../log';
import requestService from '../request/request.service';
//import { makeRequest } from './request';
import * as request from './request';

const router = Express.Router();

router.get('/:id', function(req, res, next) {
    requestService.getRequest(req.params.id).then((request) => {
        res.send(JSON.stringify(request));
    });
})

router.post('/', (req, res, next) => {
    logger.debug(req.body);
    requestService.addRequest(req.body);
    res.redirect('/:id');
})

export default router;