import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from './shared/models/user';
import { Router } from '@angular/router';

const BASE = 'http://localhost:3000/user'

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'user-token';
const PATH_KEY = 'last-path';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
    }
    createUser(data: IUser): Observable<IUser> {
        return this.http.post<IUser>(BASE, { ...data })
    }
    getUser(): Observable<IUser[]> {
        return this.http.get<IUser[]>(BASE)
    }

    // Token vs Username

    signOut(): void {
        const path = window.location.pathname;
        window.localStorage.clear();
        window.localStorage.setItem(PATH_KEY, path);
        this.router.navigateByUrl('/auth/login').then(() => {
            window.location.reload();
        });
    }
    saveToken(token: string): void {
        window.localStorage.setItem(TOKEN_KEY, token);
    }
    getToken(): string | null {
        return window.localStorage.getItem(TOKEN_KEY);
    }

    saveUser(data: any): void {
        const jsonData = JSON.stringify(data);
        window.localStorage.setItem(USER_KEY, jsonData);
    }
    getUserName(): string | null {
        return window.localStorage.getItem(USER_KEY);
    }

    // Kiểm tra token
    isTokenValid(): boolean {
        const storedToken = this.getToken();
        const userDataString = window.localStorage.getItem(USER_KEY);

        if (storedToken && userDataString) {
            const userData: IUser = JSON.parse(userDataString);
            if (userData && userData.token) {
                return storedToken === userData.token;
            }
        }
        return false;
    }

}
