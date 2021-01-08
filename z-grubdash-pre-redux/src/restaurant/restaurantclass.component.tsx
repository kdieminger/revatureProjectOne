import React from 'react';
import { Restaurant } from './restaurant';

import restaurantService from './restaurant.service';

interface RProps {
    which: number;
}
interface RState {
    data: Restaurant[];
}
class RestaurantClassComponent extends React.Component<RProps, RState> {
    
    // The constructor brings in the props.
    constructor(props: any) {
        // The Props are the data being passed to the component.
        super(props);
        console.log('Mounting: Constructor!');
        this.state = {data: []};
    }

    // gets called at end of mount phase.
    componentDidMount() {
        console.log('Mounted Component');
        restaurantService.getRestaurants().then((data) => {
            console.log(data[0]);
            // Looks at the new state and the old state, if they are different objects (== comparison), then update.
            this.setState({data: data});
        });
    }

    componentWillUnmount(){
        console.log('Component is removed from dom.');
    }

    shouldComponentUpdate(){
        // Don't override this unless you have a very good reason.
        console.log('If this returns false, it will not update');
        return true;
    }

    // gets called at end of update phase
    componentDidUpdate() {
        console.log('updated Component');
    }

    render() {
        // Called by React whenever the state changes and during mounting to actually make the display.
        console.log('render');
        return (
            <div>
            <h1>My Restaurant</h1>
            <p>{this.state.data.length ? this.state.data[this.props.which].name: ''}</p>
            </div>
        );
    }
}

export default RestaurantClassComponent;