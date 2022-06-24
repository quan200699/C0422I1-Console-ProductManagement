import {ProductManagement} from "../management/product/product-management";
import * as rl from 'readline-sync';
import {Product} from "../model/product";
import {CategoryManagement} from "../management/category/category-management";

enum ProductChoice {
    SHOW_ALL_PRODUCT = 1,
    CREATE_PRODUCT = 2,
    ADD_PRODUCT_TO_CATEGORY = 7,
}

export class ProductMenu {
    private productManagement = new ProductManagement();
    private categoryManagement = new CategoryManagement();

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
            console.log('0. Quay lại')
            choice = +rl.question('Nhập lựa chọn:')
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
                    } else {
                        let categoryName = rl.question('Nhập tên danh mục sản phầm cần thêm:');
                        let category = this.categoryManagement.findByName(categoryName);
                        if (category) {
                            products[productIndex].category = category;
                            category.products.push(products[productIndex]);
                        }else {
                            console.log('Tên danh mục sản phầm không tồn tại!');
                        }
                        break;
                    }
                }
            }
        } while (choice != 0);
    }

    showAllProducts() {
        console.log('---Danh sách sản phẩm---');
        let products = this.productManagement.getAll();
        for (let i = 0; i < products.length; i++) {
            console.log(`${i + 1}, ${products[i].name}, ${products[i].price}, ${products[i].description}, ${products[i].category?.name}`);
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
        return new Product(name, price, description);
    }
}
