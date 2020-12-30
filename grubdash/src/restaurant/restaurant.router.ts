import Express from 'express';
import restaurantService from '../restaurant/restaurant.service'

const router = Express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    restaurantService.getRestaurants().then((restaurants) => {
        res.send(JSON.stringify(restaurants));
    });
});

export default router;