export class Product {
    private _id: number = 0;
    private _name: string;
    private _price: number;
    private _description: string;


    constructor(name: string, price: number, description: string) {
        this._name = name;
        this._price = price;
        this._description = description;
    }


    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get description(): string {
        return this._description;
    }


    set id(value: number) {
        this._id = value;
    }

    set name(value: string) {
        this._name = value;
    }

    set price(value: number) {
        this._price = value;
    }

    set description(value: string) {
        this._description = value;
    }
}
