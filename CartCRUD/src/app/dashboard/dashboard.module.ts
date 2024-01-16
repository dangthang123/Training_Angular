import { NgModule } from '@angular/core';
import { DashBoardRoutingModule } from './dashboard-routing.module';
import { DashboadComponent } from './dashboard.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { DashboardBookListComponent } from './dashboard-book-list/dashboard-book-list.component';
import { DashboardOrderListComponent } from './dashboard-order-list/dashboard-order-list.component';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [
        DashboadComponent,
        NavigationComponent,
        DashboardUserComponent,
        DashboardBookListComponent,
        DashboardOrderListComponent
    ],
    imports: [
        DashBoardRoutingModule,
        MatExpansionModule,
        MatIconModule,
        CommonModule,
    ],
    exports: [],
    providers: [],
    bootstrap: [DashboadComponent]
})
export class DashBoardModule { }
