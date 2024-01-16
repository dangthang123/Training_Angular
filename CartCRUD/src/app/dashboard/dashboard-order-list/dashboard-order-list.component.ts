import { Component, OnInit } from '@angular/core';
import { DashBoardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-order-list',
  templateUrl: './dashboard-order-list.component.html',
  styleUrls: ['./dashboard-order-list.component.css']
})
export class DashboardOrderListComponent implements OnInit {
  dataOrders: any[] = [];
  constructor(
    private dashBoard: DashBoardService,
  ) { }

  ngOnInit(): void {
    this.getAllOrders();

  }
  private getAllOrders(): void {
    this.dashBoard.getAllOrder().subscribe(e => {
      this.dataOrders = e
    })
  }



}
