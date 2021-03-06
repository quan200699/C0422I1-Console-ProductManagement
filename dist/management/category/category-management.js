"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryManagement = void 0;
class CategoryManagement {
    createNew(t) {
        CategoryManagement.id++;
        t.id = CategoryManagement.id;
        CategoryManagement.categories.push(t);
    }
    findById(id) {
        let index = -1;
        for (let i = 0; i < CategoryManagement.categories.length; i++) {
            if (id == CategoryManagement.categories[i].id) {
                index = i;
                break;
            }
        }
        return index;
    }
    getAll() {
        return CategoryManagement.categories;
    }
    removeById(id) {
        let index = this.findById(id);
        if (index != -1) {
            CategoryManagement.categories.splice(index, 1);
        }
    }
    updateById(id, t) {
        let index = this.findById(id);
        if (index != -1) {
            CategoryManagement.categories[index] = t;
        }
    }
    findByName(name) {
        for (let i = 0; i < CategoryManagement.categories.length; i++) {
            if (name == CategoryManagement.categories[i].name) {
                return CategoryManagement.categories[i];
            }
        }
        return null;
    }
}
exports.CategoryManagement = CategoryManagement;
CategoryManagement.id = 0;
CategoryManagement.categories = [];
