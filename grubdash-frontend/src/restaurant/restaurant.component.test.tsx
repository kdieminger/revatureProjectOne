import React from 'react';
import { render, screen } from '@testing-library/react';
import * as router from 'react-router-dom';
import RestaurantComponent from './restaurant.component';
import { Restaurant } from './restaurant';
import { shallow } from 'enzyme';

test('the name displays correctly', () => {
    const restaurant = new Restaurant();
    restaurant.name = 'test';
    render(<router.BrowserRouter><RestaurantComponent data={restaurant}></RestaurantComponent></router.BrowserRouter>);
    const nameElement = screen.getByText(/test/);
    expect(nameElement).toBeInTheDocument();
    expect(nameElement.className).toBe('name');
});

/* shallow is meant to restrict you to a unit test of your component. */
test('the name displays correctly', () => {
    const restaurant = new Restaurant();
    restaurant.name = 'test';
    const rest = shallow(<RestaurantComponent data={restaurant}></RestaurantComponent>);
    expect(rest.find('p').first().hasClass('name')).toBeTruthy();
    expect(rest.find('p.name').html()).toBe('<p class="name">test</p>');
});