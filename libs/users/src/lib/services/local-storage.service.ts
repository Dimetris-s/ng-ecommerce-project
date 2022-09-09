import { Injectable } from '@angular/core';

const TOKEN_KEY = 'jwtToken';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    constructor() {}

    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    }

    getToken(): string {
        return localStorage.getItem(TOKEN_KEY);
    }

    deleteToken() {
        localStorage.removeItem(TOKEN_KEY);
    }
}
