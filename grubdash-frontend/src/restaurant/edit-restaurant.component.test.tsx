import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { AppAction } from '../actions';
import reducer, { AppState } from '../reducer';
import EditRestaurantComponent from './edit-restaurant.component';

test('expect that div and button are created', () => {
    const wrapper = shallow(<EditRestaurantComponent />);
    expect(wrapper.find('div')).toBeTruthy();
    expect(wrapper.find('button')).toBeTruthy();
});

test('expect that 5 inputs are created', () => {
    const store: Store<AppState, AppAction> = createStore(
        reducer,
        applyMiddleware(thunk)
    );

    const wrapper = mount(
        <Provider store={store}>
            <BrowserRouter>
                <EditRestaurantComponent />
            </BrowserRouter>
        </Provider>
    );

    expect(wrapper.find('input').length).toBe(5);
});

test('expect that when you type a name, the store updates', () => {
    const store: Store<AppState, AppAction> = createStore(
        reducer,
        applyMiddleware(thunk)
    );

    const wrapper = mount(
        <Provider store={store}>
            <BrowserRouter>
                <EditRestaurantComponent />
            </BrowserRouter>
        </Provider>
    );

    // test name
    expect(store.getState().restaurant.name).toBe('');
    const nameInput = wrapper.find('input').at(1);

    nameInput.simulate('change', { target: { name: 'name', value: 'Hello' } });
    expect(store.getState().restaurant.name).toBe('Hello');

    // test img
    expect(store.getState().restaurant.img).toBe('');
    const imgInput = wrapper.find('input').at(0);

    imgInput.simulate('change', { target: { name: 'img', value: 'Hello' } });
    expect(store.getState().restaurant.img).toBe('Hello');
});
