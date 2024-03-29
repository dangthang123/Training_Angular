import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CartModule } from './cart/cart.module';
import { BookModule } from './book/books.module';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { DashBoardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule,
    CartModule,
    BookModule,
    CommonModule,
    HttpClientModule,
    DashBoardModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
