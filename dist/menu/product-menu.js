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
exports.ProductMenu = void 0;
const product_management_1 = require("../management/product/product-management");
const rl = __importStar(require("readline-sync"));
const product_1 = require("../model/product");
const category_management_1 = require("../management/category/category-management");
var ProductChoice;
(function (ProductChoice) {
    ProductChoice[ProductChoice["SHOW_ALL_PRODUCT"] = 1] = "SHOW_ALL_PRODUCT";
    ProductChoice[ProductChoice["CREATE_PRODUCT"] = 2] = "CREATE_PRODUCT";
    ProductChoice[ProductChoice["ADD_PRODUCT_TO_CATEGORY"] = 7] = "ADD_PRODUCT_TO_CATEGORY";
})(ProductChoice || (ProductChoice = {}));
class ProductMenu {
    constructor() {
        this.productManagement = new product_management_1.ProductManagement();
        this.categoryManagement = new category_management_1.CategoryManagement();
    }
    run() {
        let choice = -1;
        do {
            console.log('---Quản lý sản phẩm---');
            console.log('1. Hiển thị danh sách sản phẩm');
            console.log('2. Thêm sản phẩm mới');
            console.log('3. Cập nhật sản phẩm');
            console.log('4. Xóa sản phẩm');
            console.log('5. Tìm kiếm sản phẩm theo tên');
            console.log('6. Sắp xếp sản phẩm theo giá giảm dần');
            console.log('7. Thêm sản phẩm vào danh mục');
            console.log('0. Quay lại');
            choice = +rl.question('Nhập lựa chọn:');
            switch (choice) {
                case ProductChoice.SHOW_ALL_PRODUCT: {
                    this.showAllProducts();
                    break;
                }
                case ProductChoice.CREATE_PRODUCT: {
                    this.showCreateProduct();
                    break;
                }
                case ProductChoice.ADD_PRODUCT_TO_CATEGORY: {
                    console.log('---Thêm sản phẩm vào danh mục---');
                    let categories = this.categoryManagement.getAll();
                    let products = this.productManagement.getAll();
                    if (categories.length == 0) {
                        console.log('Hiện tại chưa có danh mục sản phẩm!');
                        break;
                    }
                    for (let i = 0; i < categories.length; i++) {
                        console.log(`${i + 1}, ${categories[i].name}`);
                    }
                    let id = +rl.question('Nhập mã sản phẩm cần thêm vào danh mục');
                    let productIndex = this.productManagement.findById(id);
                    if (productIndex == -1) {
                        console.log('Mã sản phầm không tồn tại!');
                        break;
                    }
                    else {
                        let categoryName = rl.question('Nhập tên danh mục sản phầm cần thêm:');
                        let category = this.categoryManagement.findByName(categoryName);
                        if (category) {
                            products[productIndex].category = category;
                            category.products.push(products[productIndex]);
                        }
                        else {
                            console.log('Tên danh mục sản phầm không tồn tại!');
                        }
                        break;
                    }
                }
            }
        } while (choice != 0);
    }
    showAllProducts() {
        var _a;
        console.log('---Danh sách sản phẩm---');
        let products = this.productManagement.getAll();
        for (let i = 0; i < products.length; i++) {
            console.log(`${i + 1}, ${products[i].name}, ${products[i].price}, ${products[i].description}, ${(_a = products[i].category) === null || _a === void 0 ? void 0 : _a.name}`);
        }
    }
    showCreateProduct() {
        console.log('---Thêm mới sản phẩm---');
        let product = this.inputProduct();
        this.productManagement.createNew(product);
    }
    inputProduct() {
        let name = rl.question('Nhập tên sản phẩm:');
        let price = +rl.question('Nhập giá sản phẩm:');
        let description = rl.question('Nhập mô tả sản phẩm:');
        return new product_1.Product(name, price, description);
    }
}
exports.ProductMenu = ProductMenu;
