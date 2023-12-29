import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
  ],
  exports: [
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [],
})
export class AuthModule { }
