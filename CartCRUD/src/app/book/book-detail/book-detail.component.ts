import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../books.service';
import { IBook } from '../shared/models/book';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/auth.service';
import { ICart } from 'src/app/cart/shared/models/cart-item';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  dataIsBook: any;
  quantity: number = 1;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isBook();
    this.bookService.getBook();
    // console.log(this.bookService.getItems());

  }

  private isBook(): void {
    this.bookService.book$.subscribe((data: IBook[]) => {
      const book = data.find(b => b.id == this.route.snapshot.params['id']);
      if (book) {
        this.dataIsBook = book;
      } else {
        console.log("error");
      }
    });
  }
  getStars(point: number): number[] {
    return Array(point).fill(0).map((x, i) => i);
  }
  increaseQuantity() {
    if (this.quantity < (this.dataIsBook?.book_quantity || 1)) {
      this.quantity++;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sản phẩm đã vượt quá số lượng !!",
      });
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sản phẩm tối thiểu là 1!!",
      });
    }
  }
  addToCart() {
    if (this.authService.isTokenValid()) {
      if (this.dataIsBook && this.quantity > 0) {
        const productToAdd: IBook = { ...this.dataIsBook, quantity: this.quantity };
        const cartList: ICart = {
          id: productToAdd.id,
          book_name: productToAdd.book_name,
          book_image: productToAdd.book_image,
          book_quantity: productToAdd.book_quantity,
          book_price: productToAdd.book_price,
          book_author: productToAdd.book_author,
          book_date: productToAdd.book_date,
          book_short_description: productToAdd.book_short_description,
          book_description: productToAdd.book_description,
          total_quantity: productToAdd.quantity,
        };
        // this.bookService.addToCart(cartList).subscribe(e => {
        //   console.log('Done');
        // });
        this.bookService.addToCart(cartList);
        Swal.fire({
          title: "Thông Báo ",
          text: "Thêm vào giỏ hàng thành công",
          icon: "success"
        }).then(() => {
          this.quantity = 1
        });

      } else {
        Swal.fire({
          title: "Thông Báo ",
          text: "Lỗi thêm giỏ hàng",
          icon: "error",
        });
        console.log(1);

      }
    } else {

      Swal.fire({
        title: "Thông Báo ",
        text: "Bạn chưa đăng nhập !!!",
        icon: "error",
      }).then(() => {
        this.authService.signOut();
      });

    }

  }


}
