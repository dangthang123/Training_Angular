import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book/books.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    console.log(this.bookService.getItems());
  }

}
