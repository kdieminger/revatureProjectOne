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