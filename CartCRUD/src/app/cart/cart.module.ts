import { NgModule } from '@angular/core';
import { CartComponent } from './cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';


@NgModule({
    declarations: [CartComponent],
    imports: [CartRoutingModule,],
    exports: [],
    providers: [],
})
export class CartModule { }
