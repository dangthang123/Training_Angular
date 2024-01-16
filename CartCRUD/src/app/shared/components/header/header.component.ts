import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/cart/cart.service';
import { ICart } from 'src/app/cart/shared/models/cart-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  dataProfile: any;
  cartLength: number = this.cartService.lengthCart();
  constructor(
    private authService: AuthService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.checkLogin();
    this.retrieveUserProfile();
    this.cartService.cartChanged$.subscribe((e) => {
      this.cartLength = this.cartService.lengthCart();

    });
  }

  private retrieveUserProfile(): void {
    const token = this.authService.getUserName();
    if (token) {
      this.dataProfile = JSON.parse(token);
    }
  }
  private checkLogin(): void {
    if (this.authService.isTokenValid()) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
  handleLogout(): void {
    this.authService.signOut();
  }
}
