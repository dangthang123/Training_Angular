import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IUser } from '../shared/models/user';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passwordHidden = true;
  isLogin = false;
  dataUser: IUser[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }
  loginForm = new FormGroup({
    userNamelLogin: new FormControl('', Validators.required),
    passwordLogin: new FormControl('', Validators.required),
  })
  ngOnInit(): void {
    this.authService.getUser().subscribe((users) => {
      this.dataUser = users;
    })
    if (this.authService.isTokenValid()) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }



  }
  handleLogin(): void {
    const { userNamelLogin, passwordLogin } = this.loginForm.value;
    const foundUser = this.dataUser.find(
      (user: IUser) => user.username === userNamelLogin && user.password === passwordLogin
    );

    if (foundUser && foundUser.token) {
      const userToSave = {
        id: foundUser.id,
        username: foundUser.username,
        name: foundUser.name,
        sdt: foundUser.sdt,
        email: foundUser.email,
        token: foundUser.token,
      };
      this.authService.saveUser(userToSave)
      this.authService.saveToken(foundUser.token);
      Swal.fire({
        title: "Thông Báo ",
        text: "Đăng Nhập Thành Công",
        icon: "success"
      }).then(() => {
        window.location.reload();
      });
      const lastPath = window.localStorage.getItem('last-path');
      if (lastPath) {
        this.router.navigateByUrl(lastPath);
        window.localStorage.removeItem('last-path');
      } else {
        this.router.navigate(['']);
      }
    } else {
      Swal.fire({
        title: "Thông Báo",
        text: "Tên người dùng hoặc mật khẩu không chính xác. Vui lòng thử lại !",
        icon: "error"
      });

    }

  };
  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }
}
