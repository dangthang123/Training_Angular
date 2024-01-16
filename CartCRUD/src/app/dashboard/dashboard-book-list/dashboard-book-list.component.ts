import { Component, OnInit } from '@angular/core';
import { DashBoardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-book-list',
  templateUrl: './dashboard-book-list.component.html',
  styleUrls: ['./dashboard-book-list.component.css']
})
export class DashboardBookListComponent implements OnInit {
  dataBooks: any[] = [];
  constructor(
    private dashBoard: DashBoardService
  ) { }

  ngOnInit(): void {
    this.getAllBooks();
  }
  private getAllBooks(): void {
    this.dashBoard.getAllBook().subscribe(e => {
      this.dataBooks = e
      console.log(e);
    })
  }
}
