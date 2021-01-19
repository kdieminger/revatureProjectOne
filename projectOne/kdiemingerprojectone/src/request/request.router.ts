import Express, { request } from 'express';
import logger from '../log';
import requestService from '../request/request.service';
import { getRFIByUser, makeRequest } from './request';

const router = Express.Router();

router.get('/:id', function(req, res, next) {
    requestService.getRequest(req.params.id).then((request) => {
        res.send(JSON.stringify(request));
    });
})

router.get('/:id/RFI', (req, res, next) => {
    getRFIByUser(req.params.id).then((RFIs) => {
        res.send(JSON.stringify(RFIs));
    })
})

router.post('/', (req, res, next) => {
    logger.debug(req.body);
    makeRequest(req.body.username,req.body.type,req.body.date,req.body.time,req.body.location,
        req.body.description,req.body.cost,req.body.justification);
    res.redirect('/');
})

router.put('/', (req, res, next) => {
    logger.debug(req.body);
    requestService.updateRequest(req.body).then((data) => {
        res.send(data);
    })
})

export default router;