import { NgModule } from '@angular/core';
import { CartComponent } from './cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { MatCardModule } from '@angular/material/card'
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
    declarations: [
        CartComponent,
        CheckoutComponent,
    ],
    imports: [
        CartRoutingModule,
        MatCardModule,
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatRadioModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        ReactiveFormsModule,
    ],
    exports: [],
    providers: [],
})
export class CartModule { }
