import { Item } from "./item";

export class Expenses{
    off:number;
    products:Array<Item>;

    constructor() {
        this.off = 0;
        this.products = new Array();
    }
}