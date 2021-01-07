import Express from 'express';
import logger from '../log';
import restaurantService from '../restaurant/restaurant.service'

const router = Express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    restaurantService.getRestaurants().then((restaurants) => {
        res.send(JSON.stringify(restaurants));
    });
});

router.get('/:id', function(req, res, next) {
    restaurantService.getRestaurant(req.params.id).then((rest)=>{
        res.send(JSON.stringify(rest));
    });
})

router.delete('/:id', function (req, res, next) {
    logger.debug(req.body);
    restaurantService.deleteRestaurant(req.params.id).then((data)=> {
        logger.debug(data);
        res.sendStatus(200); // Created
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500); // Server error, sorry
    })
});

router.post('/', (req, res, next) => {
    logger.debug(req.body);
    restaurantService.addRestaurant(req.body).then((data)=> {
        logger.debug(data);
        res.sendStatus(201); // Created
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500); // Server error, sorry
    })
});
export default router;