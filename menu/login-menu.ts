import {UserManagement} from "../management/user/user-management";
import {User} from "../model/user";
import * as rl from "readline-sync";
import {Role} from "../model/role";
import {AdminMenu} from "./admin-menu";

enum LoginChoice {
    LOGIN = 1,
    REGISTER = 2
}

export class LoginMenu {
    private userManagement = new UserManagement();
    private adminMenu = new AdminMenu();

    inputUser(): User {
        let username = this.inputUsername();
        let regexForPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/g;
        let password = this.inputPassword(regexForPassword);
        this.inputConfirmPassword(password);
        let name = rl.question('Nhập họ tên:');
        let email = this.inputEmail();
        return new User(username, password, email, name);
    }

    inputEmail(): string {
        let email = '';
        let isValidEmail = true;
        do {
            email = rl.question('Nhập email (abc@gmail.com):');
            let regexForEmail: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!regexForEmail.test(email)) {
                isValidEmail = false;
                console.log('Định dạng email không hợp lệ!')
            } else {
                isValidEmail = true;
                let currentUser = this.userManagement.findByEmail(email);
                if (currentUser) {
                    console.log('Email đã tồn tại');
                    isValidEmail = false;
                } else {
                    isValidEmail = true;
                }
            }

        } while (!isValidEmail);
        return email;
    }

    inputConfirmPassword(password: string): void {
        let confirmPassword = '';
        do {
            confirmPassword = rl.question('Nhập lại mật khẩu:');
            if (password != confirmPassword) {
                console.log('Mật khẩu nhập lại không khớp!');
            }
        } while (password != confirmPassword)
    }

    inputUsername(): string {
        let username = '';
        let isValidUsername = true;
        do {
            username = rl.question('Nhập username:');
            let currentUser = this.userManagement.findByUsername(username);
            if (currentUser) {
                isValidUsername = false;
                console.log('Tên tài khoản đã tồn tại!')
            } else {
                isValidUsername = true;
            }
        } while (!isValidUsername);
        return username;
    }

    inputPassword(regexForPassword: RegExp): string {
        let password = '';
        let isValidPassword = true;
        do {
            password = rl.question('Nhập mật khẩu (Có 1 ký tự viết hoa, 1 viết thường, 1 ký tự đặc biệt và 1 số):');
            if (!regexForPassword.test(password)) {
                isValidPassword = false;
                console.log('Password nhập vào phải có ít nhất 1 ký tự thường 1 hoa 1 đặc biệt 1 số!')
            } else {
                isValidPassword = true;
            }
        } while (!isValidPassword);
        return password;
    }

    run() {
        let choice = -1;
        do {
            console.log('---Hệ thống quản lý sản phẩm---');
            console.log('1. Đăng nhập')
            console.log('2. Đăng ký')
            console.log('0. Thoát')
            choice = +rl.question('Nhập lựa chọn của bạn:');
            switch (choice) {
                case LoginChoice.LOGIN: {
                    console.log('---Đăng nhập---');
                    this.loginForm();
                    break;
                }
                case LoginChoice.REGISTER: {
                    console.log('---Đăng ký tài khoản---');
                    this.registerForm();
                    break;
                }
            }
        } while (choice != 0);
    }

    registerForm() {
        let user = this.inputUser();
        this.userManagement.createNew(user);
        console.log('Đăng ký thành công!')
    }

    loginForm() {
        let username = rl.question('Nhập tài khoản:');
        let password = rl.question('Nhập mật khẩu:');
        /*
        current user là lấy ra giá trị của user đang đăng nhập.
        Nếu username và password không đúng thì current user = null
        * */
        let currentUser = this.userManagement.login(username, password);
        if (currentUser) {
            console.log('Đăng nhập thành công!');
            //Check role => admin thì mở menu admin, user mở menu user
            if (currentUser.role == Role.ADMIN) {
                //mở menu admin
                this.adminMenu.run();
            } else {
                //mở menu user
                console.log('---Bán hàng---')
                console.log('1. Thêm sản phẩm vào giỏ hàng')
                console.log('2. Mua hàng')
                console.log('3. Thanh toán')
                console.log('0. Đăng xuất')
            }
        } else {
            console.log('Tài khoản hoặc mật khẩu không đúng!');
        }
    }
}
