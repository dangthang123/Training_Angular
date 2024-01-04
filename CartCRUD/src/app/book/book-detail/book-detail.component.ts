import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../books.service';
import { IBook } from '../shared/models/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  dataIsBook: any;
  quantity = 1;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.isBook();
    // console.log(this.bookService.getItems());

  }

  private isBook(): void {
    this.bookService.getBook().subscribe((data: IBook[]) => {
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
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  addToCart() {
    if (this.dataIsBook) {
      const existingCartItem = this.bookService.getItems().find(item => item.id === this.dataIsBook.id);
      if (existingCartItem) {
        existingCartItem.quantity = existingCartItem.quantity + this.quantity;
      } else {
        const itemToAdd: IBook = { ...this.dataIsBook, quantity: this.quantity };
        console.log('a');

        this.bookService.addToCart(itemToAdd);
      }
    }
  }


}
