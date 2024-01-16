import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ICart, IOrder } from './shared/models/cart-item';
const CART_KEY = "cartItems";
const CART_ORDER_KEY = "cartOrders";
const ORDER_URL = "http://localhost:3000/order";
@Injectable({ providedIn: 'root' })
export class CartService {
    private _cartSubject: BehaviorSubject<ICart[]> = new BehaviorSubject<ICart[]>([]);
    public cart$: Observable<ICart[]> = this._cartSubject.asObservable();

    private _cartChangedSubject: Subject<void> = new Subject<void>();
    public cartChanged$: Observable<void> = this._cartChangedSubject.asObservable();
    constructor(
        private http: HttpClient
    ) {
        const storedCartItems = localStorage.getItem(CART_KEY);

        if (storedCartItems) {
            this._cartSubject.next(JSON.parse(storedCartItems));
        }
    }
    getCart(): ICart[] {
        return this._cartSubject.getValue();
    }
    addToCart(product: ICart) {
        const currentCart = this.getCart();
        const updatedCart = this.updateCartItem(currentCart, product);
        this.updateCart(updatedCart);
    }
    private updateCartItem(cart: ICart[], product: ICart): ICart[] {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.total_quantity += product.total_quantity;
        } else {
            cart.push(product);
        }

        return cart;
    }
    updateCart(cart: ICart[]): void {
        this._cartChangedSubject.next();
        this._cartSubject.next(cart);

        window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
    lengthCart(): number {
        const cart = this.getCart();
        return cart ? cart.length : 0;
    }
    cartOrder(cartOrder: ICart[]): void {
        // this._cartChangedSubject.next();
        // this._cartSubject.next(cartOrder);
        window.localStorage.setItem(CART_ORDER_KEY, JSON.stringify(cartOrder));
    }
    lengthCartOrders(data: ICart[]): number {
        return data.reduce((total, currentItem) => total + currentItem.total_quantity, 0);
    };
    totalCartOrders(data: ICart[]): number {
        return data.reduce((total, currentItem) => total + total + (currentItem.total_quantity) * (currentItem.book_price), 0);
    }
    removeItemsFromCart(items: ICart[]): void {
        const currentCart = this.getCart();
        const updatedCart = currentCart.filter(item => !items.includes(item));
        this.updateCart(updatedCart);
    }
    getCartOrder(): string | null {
        return window.localStorage.getItem(CART_ORDER_KEY);
    }
    createOrder(data: IOrder): Observable<IOrder> {
        window.localStorage.removeItem(CART_ORDER_KEY)
        return this.http.post<IOrder>(ORDER_URL, { ...data })
    }
}
