import { Component, OnInit } from '@angular/core';
import { BookService } from '../books.service';
import { IBook } from '../shared/models/book';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  dataBooks: IBook[] = [];
  currentPageData: IBook[] = [];
  initialData: IBook[] = [];
  pageSize = 6;
  pageIndex = 0;
  constructor(
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }
  private getBooks(): void {
    const book = this.bookService.getBook();
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
      this.currentPageData = this.initialData.filter((item: any) => {
        return (
          item.book_name.toLowerCase().includes(keyword) ||
          item.book_author.toLowerCase().includes(keyword)
        );
      });
    }
  }

}
