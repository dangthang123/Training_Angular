import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ICart, IOrder } from '../shared/models/cart-item';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { phoneNumberValidator } from 'src/app/auth/shared/utils/auth-ultis';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from 'src/app/auth/shared/models/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  dataOrder: ICart[] = [];
  lengthOrder: number = 0;
  totalOrder: number = 0;
  dataInfo: any;
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
  ) {
  }
  userFormOrder = new FormGroup({
    name: new FormControl('', Validators.required),
    sdt: new FormControl('', [Validators.required, phoneNumberValidator()]),
    address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    delivery: new FormControl('', Validators.required),
    describe: new FormControl(''),
  })

  ngOnInit(): void {
    this.getAllCartOrder();
    this.lengthOrders();
    this.totalOrders();
    this.getInfo();
    this.handleUseForm();
  }
  private getAllCartOrder(): void {
    const order = this.cartService.getCartOrder();
    if (order) {
      this.dataOrder = JSON.parse(order);
    } else {
      console.log('error');
    }
  }
  private lengthOrders(): void {
    if (this.dataOrder.length > 0) {
      this.lengthOrder = this.cartService.lengthCartOrders(this.dataOrder);
    }
  }
  private totalOrders(): void {
    if (this.dataOrder.length > 0) {
      this.totalOrder = this.cartService.totalCartOrders(this.dataOrder);
    }
  }
  private getInfo(): void {
    const info = this.authService.getUserName();
    if (info) {
      this.dataInfo = JSON.parse(info);
    } else {
      console.log('error');
    }

  }
  private handleUseForm(): void {
    const infoUser = this.dataInfo;
    this.userFormOrder.patchValue({
      name: infoUser.name || '',
      sdt: infoUser.sdt || '',
      address: infoUser.address || '',
      email: infoUser.email || '',
    })
  }
  handleSubmitOrder(): void {
    if (this.userFormOrder.valid) {
      const order: IOrder = {
        // id: 1,
        name: this.userFormOrder.value.name,
        sdt: this.userFormOrder.value.sdt,
        email: this.userFormOrder.value.email,
        address: this.userFormOrder.value.address,
        delivery: this.userFormOrder.value.delivery,
        describe: this.userFormOrder.value.describe,
        order: this.dataOrder.map(item => ({
          id: item.id,
          book_name: item.book_name,
          book_image: item.book_image,
          book_price: item.book_price,
          book_quantity: item.book_quantity,
          book_author: item.book_author,
          book_date: item.book_date,
          book_short_description: item.book_short_description,
          book_description: item.book_description,
          total_quantity: item.total_quantity,
        })),
        total_quantity: this.lengthOrder,
        total_price: this.totalOrder,
      };
      this.cartService.createOrder(order).subscribe(
        (response) => {
          Swal.fire({
            icon: "success",
            title: "Thông báo",
            text: "Sản phẩm đã được đặt thành công",
          });
          console.log(response);
          this.router.navigate(['/'])
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Thông báo",
            text: "Đặt hàng thất bại !!!",
          });
          console.error(error);
        }
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Thông báo",
        text: "Đặt hàng thất bại !!!",
      });

    }
  }

}
