export interface Restaurant {
    name: string,
    chef: string,
    menu: Food[],
    rating: number
    hours: Hours[]
}
export interface Food {
    name: string,
    price: number
}
export interface Hours {
    day: string,
    open: number,
    close: number
}