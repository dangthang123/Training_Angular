import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboadComponent } from './dashboard.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { DashboardBookListComponent } from './dashboard-book-list/dashboard-book-list.component';
import { DashboardOrderListComponent } from './dashboard-order-list/dashboard-order-list.component';

const routes: Routes = [

    {
        path: '',
        component: DashboadComponent,
        children: [
            {
                path: '',
                redirectTo: 'user',
                pathMatch: 'full'
            },
            {
                path: 'user',
                component: DashboardUserComponent
            },
            {
                path: 'book-list',
                component: DashboardBookListComponent,
            },
            {
                path: 'order-list',
                component: DashboardOrderListComponent,
            },

        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashBoardRoutingModule { }
