export class Restaurant {
    // [key: string]: any;
    name: string = '';
    chef: string = '';
    menu: Food[] = [];
    rating: number = 0;
    hours: Hours[] = [];
    img: string = '';
    type: string = '';
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