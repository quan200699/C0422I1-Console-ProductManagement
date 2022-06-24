"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(name, price, description) {
        this._id = 0;
        this._category = null;
        this._name = name;
        this._price = price;
        this._description = description;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
    get description() {
        return this._description;
    }
    set id(value) {
        this._id = value;
    }
    set name(value) {
        this._name = value;
    }
    set price(value) {
        this._price = value;
    }
    set description(value) {
        this._description = value;
    }
    get category() {
        return this._category;
    }
    set category(value) {
        this._category = value;
    }
}
exports.Product = Product;
