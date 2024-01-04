import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IUser } from '../shared/models/user';
import { passwordValidator, phoneNumberValidator, usernameValidator } from '../shared/utils/auth-ultis';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  passwordHidden = true;
  isLogin = false;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, usernameValidator()]),
    name: new FormControl('', Validators.required),
    sdt: new FormControl('', [Validators.required, phoneNumberValidator()]),
    address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, passwordValidator]),
    role: new FormControl('user'),
  })

  ngOnInit(): void {
    if (this.authService.isTokenValid()) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  handleSubmit() {
    if (this.userForm.valid) {
      // console.log(this.userForm.value);

      const token = uuid();
      const userDataWithToken: IUser = {
        ...this.userForm.getRawValue(),
        token: token
      };
      this.authService.createUser(userDataWithToken).subscribe(e => {
        // console.log('done');
        Swal.fire({
          icon: "success",
          title: "Thông báo ",
          text: "Tạo tài khoản thành công",
        });
        this.router.navigate(['/login']);
      })
    } else {
      // console.log("error");
      Swal.fire({
        icon: "error",
        title: "Thông báo",
        text: "Tạo tài khoản thất bại",
      });
    }
  }
  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }
}
