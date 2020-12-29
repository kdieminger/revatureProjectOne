import Express from 'express';
import publicDir from '../constant'
import logger from '../log'
import restaurantService from '../restaurant/restaurant.service'

const router = Express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
 
    let restString;
    restaurantService.getRestaurants().then((restaurants) => {
        restString = restaurants.map((rest) => {
            return(`<p>${rest.name}, the chef is ${rest.chef}, rating is: ${rest.rating}, Hours: ${JSON.stringify(rest.hours)}, Menu: ${JSON.stringify(rest.menu)}</p>`)
        })
        res.send(restString.join(''));
      })
});

export default router;