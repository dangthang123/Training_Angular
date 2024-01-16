import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IBook } from './shared/models/book';
import { HttpClient } from '@angular/common/http';
import { ICart } from '../cart/shared/models/cart-item';
import { CartService } from '../cart/cart.service';

const BOOK_URL = "http://localhost:3000/book"
const CART_KEY = "cartItems";
const CART_URL = "http://localhost:3000/cart";
@Injectable(
    { providedIn: 'root' }
)

export class BookService {
    cartItems: ICart[] = [];
    private _bookSubject: BehaviorSubject<IBook[]> = new BehaviorSubject<IBook[]>([]);
    public book$: Observable<IBook[]> = this._bookSubject.asObservable();
    constructor(
        private http: HttpClient,
        private cartService: CartService
    ) {
        const storedCartItems = localStorage.getItem(CART_KEY);
        if (storedCartItems) {
            this.cartItems = JSON.parse(storedCartItems);
        }
    }
    get books(): IBook[] {
        return this._bookSubject.getValue();
    }

    set books(value: IBook[]) {
        this._bookSubject.next(value);
    }
    getBook(): void {
        this.http.get<IBook[]>(BOOK_URL).subscribe((book) => {
            this.books = book;
        });
    }
    // addToCart(product: ICart) {
    //     const existingItem = this.cartItems.find(item => item.id === product.id);
    //     console.log(existingItem);
    //     if (existingItem) {
    //         existingItem.total_quantity += product.total_quantity;
    //     } else {
    //         this.cartItems.push(product);
    //     }
    //     localStorage.setItem(CART_KEY, JSON.stringify(this.cartItems));
    // }
    addToCart(product: ICart) {
        this.cartService.addToCart(product);
    }
    getItems() {
        return this.cartItems;
    }
}