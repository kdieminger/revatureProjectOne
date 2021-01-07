export class Restaurant {
    name: string = '';
    chef: string = '';
    menu: Food[] = [];
    rating: number = 0;
    hours: Hours[] = [];
    img: string = '';
    type: string = '';
    eta?: number = 0;
    constructor(){}
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