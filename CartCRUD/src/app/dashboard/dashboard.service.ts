import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const ORDER_URL = 'http://localhost:3000/order'
const BOOK_URL = 'http://localhost:3000/order'
@Injectable({ providedIn: 'root' })
export class DashBoardService {
    constructor(
        private http: HttpClient,
    ) { }
    getAllOrder(): Observable<any> {
        return this.http.get(ORDER_URL)
    }
    getAllBook(): Observable<any> {
        return this.http.get(BOOK_URL)
    }
}