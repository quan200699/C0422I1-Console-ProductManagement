import {ICategoryManagement} from "./i-category-management";
import {Category} from "../../model/category";

export class CategoryManagement implements ICategoryManagement {
    private static id: number = 0;
    private static categories: Category[] = [];

    createNew(t: Category): void {
        CategoryManagement.id++;
        t.id = CategoryManagement.id;
        CategoryManagement.categories.push(t);
    }

    findById(id: number): number {
        let index = -1;
        for (let i = 0; i < CategoryManagement.categories.length; i++) {
            if (id == CategoryManagement.categories[i].id) {
                index = i;
                break;
            }
        }
        return index;
    }

    getAll(): Category[] {
        return CategoryManagement.categories;
    }

    removeById(id: number): void {
        let index = this.findById(id);
        if (index != -1) {
            CategoryManagement.categories.splice(index, 1);
        }
    }

    updateById(id: number, t: Category): void {
        let index = this.findById(id);
        if (index != -1) {
            CategoryManagement.categories[index] = t;
        }
    }

    findByName(name: string): Category | null {
        for (let i = 0; i < CategoryManagement.categories.length; i++) {
            if (name == CategoryManagement.categories[i].name) {
                return CategoryManagement.categories[i];
            }
        }
        return null;
    }

}
