import {ProductManagement} from "../management/product/product-management";
import * as rl from 'readline-sync';
import {Product} from "../model/product";

enum ProductChoice {
    SHOW_ALL_PRODUCT = 1,
    CREATE_PRODUCT = 2,
}

export class ProductMenu {
    private productManagement = new ProductManagement();

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
            }
        } while (choice != 0);
    }

    showAllProducts() {
        console.log('---Danh sách sản phẩm---');
        let products = this.productManagement.getAll();
        for (let i = 0; i < products.length; i++) {
            console.log(`${i + 1}, ${products[i].name}, ${products[i].price}, ${products[i].description}`);
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
