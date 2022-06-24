import {CategoryManagement} from "../management/category/category-management";
import {ICategoryManagement} from "../management/category/i-category-management";
import * as rl from 'readline-sync';
import {Category} from "../model/category";

export class CategoryMenu {
    private categoryManagement: ICategoryManagement = new CategoryManagement();

    run() {
        let choice = -1;
        do {
            console.log('---Quản lý danh mục---');
            console.log('1. Hiển thị danh sách danh mục')
            console.log('2. Tạo danh mục mới')
            console.log('3. Cập nhật thông tin danh mục')
            console.log('4. Xóa danh mục')
            console.log('5. Hiển thị danh sách sản phẩm theo danh mục')
            console.log('0. Quay lại')
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
                    let category = new Category(name);
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
                    } else {
                        console.log('Tên danh mục sản phầm không tồn tại!');
                    }
                    break;
                }
            }
        } while (choice != 0);
    }
}
