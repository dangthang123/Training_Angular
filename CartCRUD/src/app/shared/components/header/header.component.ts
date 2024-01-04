import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  dataProfile: any;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.authService.isTokenValid()) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    this.retrieveUserProfile();

  }

  private retrieveUserProfile(): void {
    const token = this.authService.getUserName();
    if (token) {
      this.dataProfile = JSON.parse(token);
    }
  }
  handleLogout(): void {
    this.authService.signOut();
  }
}
