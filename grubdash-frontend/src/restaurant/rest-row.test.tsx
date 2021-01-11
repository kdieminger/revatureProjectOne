import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import RestRow from './rest-row';
import { Restaurant } from './restaurant';
import RestaurantComponent from './restaurant.component';

test('three restaurants are rendered', () => {
    const arr: Restaurant[] = [];
    arr.push(new Restaurant());
    arr.push(new Restaurant());
    arr.push(new Restaurant());

    const wrapper = shallow(<RestRow restaurants={arr}></RestRow>);
    expect(wrapper.find(RestaurantComponent).length).toBe(3);
});


test('two restaurants are rendered', () => {
    const arr: Restaurant[] = [];
    arr.push(new Restaurant());
    arr.push(new Restaurant());

    const wrapper = shallow(<RestRow restaurants={arr}></RestRow>);
    expect(wrapper.find(RestaurantComponent).length).toBe(2);
});


// mount is more of an integration test. We can check on children
test('one restaurants are rendered with props', () => {
    const arr: Restaurant[] = [];
    const rest = new Restaurant();
    rest.rating = 4;
    arr.push(rest);

    const wrapper = mount(<BrowserRouter><RestRow restaurants={arr}></RestRow></BrowserRouter>);
    expect(wrapper.find('p.rating').html()).toBe('<p class="rating">Rating: 4 stars</p>');
})