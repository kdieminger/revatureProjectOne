export interface RestaurantType {
    name: string;
    chef: string;
    menu: Food[];
    rating: number;
    hours: Hours[];
    img: string;
    type: string;
    eta?: number;
}
export interface Food {
    name: string;
    price: number;
}
export interface Hours {
    day: string;
    open: number;
    close: number;
}