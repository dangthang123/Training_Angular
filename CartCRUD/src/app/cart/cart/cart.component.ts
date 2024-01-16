import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book/books.service';
import { CartService } from '../cart.service';
import { ICart } from '../shared/models/cart-item';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  dataCart: ICart[] = [];
  selectedItems: ICart[] = [];
  lengthCartOrder: number = 0;
  totalCartOrder: number = 0;
  constructor(
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllCart();
    console.log(this.dataCart);


  }
  private getAllCart(): void {
    const cartList = this.cartService.cart$;
    if (cartList) {
      cartList.subscribe(e => {
        this.dataCart = e
      })
    } else {
      console.log('error');
    }
  }
  increaseQuantity(item: ICart): void {
    if (item.book_quantity > item.total_quantity) {
      item.total_quantity++;
      if (this.selectedItems.length > 0) {
        this.lengthCartOrder = this.cartService.lengthCartOrders(this.selectedItems);
        this.totalCartOrder = this.cartService.totalCartOrders(this.selectedItems);
      } else {
        console.log('Chưa có sản phẩm');
      }
      this.cartService.updateCart(this.dataCart);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sản phẩm đã vượt quá số lượng !!",
      });
    }
  };

  decreaseQuantity(item: ICart): void {
    if (item.total_quantity > 0) {
      item.total_quantity--;
      if (this.selectedItems.length > 0) {
        this.lengthCartOrder = this.cartService.lengthCartOrders(this.selectedItems);
        this.totalCartOrder = this.cartService.totalCartOrders(this.selectedItems);
      } else {
        console.log('Chưa có sản phẩm');
      }
      this.cartService.updateCart(this.dataCart);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sản phẩm tối thiểu là 1!!",
      });
    }
  }

  updateQuantity(item: ICart, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newQuantity = parseInt(inputElement.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      item.total_quantity = newQuantity;
      this.cartService.updateCart(this.dataCart);
    }
  }

  removeFromCart(item: ICart): void {
    const index = this.dataCart.indexOf(item);

    if (index !== -1) {
      Swal.fire({
        title: "Bạn có chắc chắn muốn xoá sản phẩm không?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Có",
        denyButtonText: `Không`
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataCart.splice(index, 1);
          this.cartService.updateCart(this.dataCart);
          Swal.fire("Đã xoá sản phẩm!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Sản phẩm vẫn trong giỏ hàng", "", "info");
        }
      });
    }
  }
  checkItems(event: Event, item: ICart): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedItems.push(item);
      if (this.selectedItems.length > 0) {
        this.lengthCartOrder = this.cartService.lengthCartOrders(this.selectedItems);
        this.totalCartOrder = this.cartService.totalCartOrders(this.selectedItems);
      } else {
        console.log('Chưa có sản phẩm');
      }
    } else {
      const index = this.selectedItems.indexOf(item);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      }
      this.lengthCartOrder = 0;
      this.totalCartOrder = 0;
    }
  }

  handleCheckout(): void {

    if (this.selectedItems.length > 0) {
      Swal.fire({
        icon: "success",
        title: "Thông báo",
        text: "Thanh toán nào",
      }).then(() => {
        this.cartService.removeItemsFromCart(this.selectedItems);
        this.cartService.cartOrder(this.selectedItems);
        this.router.navigate(['/cart/checkout']);
      }
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Chưa chọn sản phẩm nào !!!",
      });
    }
  }
}
