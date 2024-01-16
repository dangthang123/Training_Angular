import { Component, OnInit } from '@angular/core';
import { BookService } from '../books.service';
import { IBook } from '../shared/models/book';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';
import { ICart } from 'src/app/cart/shared/models/cart-item';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  dataBooks: IBook[] = [];
  currentPageData: IBook[] = [];
  initialData: IBook[] = [];
  quantity: number = 1;
  pageSize = 6;
  pageIndex = 0;
  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.getBooks();
    this.bookService.getBook();
  }

  private getBooks(): void {
    const book = this.bookService.book$;
    if (book) {
      book.subscribe(e => {
        this.dataBooks = e
        this.currentPageData = e.slice(0, this.pageSize);
        this.initialData = [...this.dataBooks];
      });
    } else {
      console.log("error");
    }
  }
  onChangePaginator(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    if (this.dataBooks) {
      const currentPage = this.dataBooks.slice(startIndex, endIndex);
      this.currentPageData = currentPage;
    }
  }
  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const keyword = target.value.toLowerCase();

    if (!keyword) {
      this.currentPageData = [...this.initialData];
    } else {
      this.currentPageData = this.initialData.filter((item: IBook) => {
        return (
          item.book_name.toLowerCase().includes(keyword) ||
          item.book_author.toLowerCase().includes(keyword)
        );
      });
    }
  }
  addToCart(item: number) {
    if (this.authService.isTokenValid() && this.dataBooks.length > 0) {
      const itemAddCart = this.dataBooks.find(e => e.id == item)
      if (itemAddCart) {
        const productToAdd: IBook = { ...itemAddCart, quantity: this.quantity };
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
        this.bookService.addToCart(cartList);
        Swal.fire({
          icon: 'success',
          title: "Thêm vào giỏ hàng thành công",
          text: 'Bạn có muốn đến giỏ hàng không?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Có",
          denyButtonText: `Không`
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/cart'])
          } else if (result.isDenied) {
          }
        });
      }
      else {
        console.log("error");
        Swal.fire({
          title: "Thông Báo ",
          text: "Lỗi thêm giỏ hàng",
          icon: "error",
        });
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
