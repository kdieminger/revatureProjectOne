import axios from 'axios';
import restaurantService from './restaurant.service';

// With the getRestaurants method there are two things we can test.
// The first thing is that axios.get is actually called. If it isn't called the rest of the test isn't going to pass.
// The second thing is that the data object is what is returned from the function.
// We can also check the paramaters of the get function as a third thing (testing the environment variables are correct?)
test('getRestaurants returns a promise with data in it.', async ()=>{
    let returnValues;
    
    let obj = {data: []};
    axios.get = jest.fn().mockResolvedValue(obj);
    await restaurantService.getRestaurants().then((arr) => {
        returnValues = arr;
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(returnValues).toBe(obj.data);
    expect(axios.get).toHaveBeenCalledWith(process.env.REACT_APP_SERVER_URI+'restaurants');
});