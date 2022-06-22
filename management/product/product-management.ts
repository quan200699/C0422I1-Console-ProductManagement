import {IProductManagement} from "./i-product-management";
import {Product} from "../../model/product";

export class ProductManagement implements IProductManagement {
    private static id: number = 0;
    private static products: Product[] = [];

    createNew(t: Product): void {
        ProductManagement.id++;
        t.id = ProductManagement.id;
        ProductManagement.products.push(t);
    }

    findById(id: number): number {
        return 0;
    }

    getAll(): Product[] {
        return ProductManagement.products;
    }

    removeById(id: number): void {
    }

    updateById(id: number, t: Product): void {
    }

}
