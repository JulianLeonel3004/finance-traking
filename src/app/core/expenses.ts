import { Item } from "./item";

export class Expenses{
    name:string;
    off:number;
    products:Array<Item>;

    constructor(name?:string) {
        this.name = name;
        this.off = 0;
        this.products = new Array();
    }
}