import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IBook } from './shared/models/book';
import { HttpClient } from '@angular/common/http';

const BOOK_URL = "http://localhost:3000/book"
const CART_KEY = "cartItems";
@Injectable(
    { providedIn: 'root' }
)

export class BookService {
    cartItems: IBook[] = [];

    constructor(
        private http: HttpClient,
    ) {
        const storedCartItems = localStorage.getItem(CART_KEY);
        if (storedCartItems) {
            this.cartItems = JSON.parse(storedCartItems);
        }
    }

    getBook(): Observable<IBook[]> {
        return this.http.get<IBook[]>(BOOK_URL);
    }
    addToCart(product: IBook) {
        this.cartItems.push(product);
        localStorage.setItem(CART_KEY, JSON.stringify(this.cartItems));
    }
    getItems() {
        return this.cartItems;
    }
}