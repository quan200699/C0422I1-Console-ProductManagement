"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMenu = void 0;
const category_management_1 = require("../management/category/category-management");
const rl = __importStar(require("readline-sync"));
const category_1 = require("../model/category");
class CategoryMenu {
    constructor() {
        this.categoryManagement = new category_management_1.CategoryManagement();
    }
    run() {
        let choice = -1;
        do {
            console.log('---Quản lý danh mục---');
            console.log('1. Hiển thị danh sách danh mục');
            console.log('2. Tạo danh mục mới');
            console.log('3. Cập nhật thông tin danh mục');
            console.log('4. Xóa danh mục');
            console.log('5. Hiển thị danh sách sản phẩm theo danh mục');
            console.log('0. Quay lại');
            choice = +rl.question('Nhập lựa chọn của bạn:');
            switch (choice) {
                case 1: {
                    console.log('---Hiển thị danh sách danh mục sản phẩm---');
                    let categories = this.categoryManagement.getAll();
                    for (const category of categories) {
                        console.log(`${category.id}, ${category.name}`);
                    }
                    break;
                }
                case 2: {
                    console.log('---Thêm danh mục mới---');
                    let name = rl.question('Nhập tên danh mục:');
                    let category = new category_1.Category(name);
                    this.categoryManagement.createNew(category);
                    break;
                }
                case 5: {
                    console.log('---Hiển thị danh sách sản phẩm---');
                    let name = rl.question('Nhập tên danh mục sản phầm cần tìm:');
                    let category = this.categoryManagement.findByName(name);
                    if (category) {
                        for (let i = 0; i < category.products.length; i++) {
                            console.log(`${i + 1}, ${category.products[i].name}, ${category.products[i].price}, ${category.products[i].description}`);
                        }
                    }
                    else {
                        console.log('Tên danh mục sản phầm không tồn tại!');
                    }
                    break;
                }
            }
        } while (choice != 0);
    }
}
exports.CategoryMenu = CategoryMenu;
