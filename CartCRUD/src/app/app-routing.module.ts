import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('../app/book/books.module').then(m => m.BookModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('../app/cart/cart.module').then(m => m.CartModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../app/dashboard/dashboard.module').then(m => m.DashBoardModule),
  },
  {
    path: 'not-found-404',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found-404',
    pathMatch: 'full',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
