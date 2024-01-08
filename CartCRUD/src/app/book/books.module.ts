import { NgModule } from '@angular/core';
import { BookListComponent } from './book-list/book-list.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { BookRoutingModule } from './book-routing.module';
@NgModule({

    declarations: [
        BookListComponent,
        BookDetailComponent],
    imports: [
        MatGridListModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        CommonModule,
        MatPaginatorModule,
        MatTabsModule,
        FormsModule,
        BookRoutingModule,
    ],
    exports: [],
    providers: [],
})
export class BookModule { }
