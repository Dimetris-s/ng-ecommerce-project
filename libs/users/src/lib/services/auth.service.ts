import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthUser } from './types';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiURLAuth = environment.baseURL + '/auth';
    constructor(
        private http: HttpClient,
        private router: Router,
        private token: LocalStorageService
    ) {}

    login(email: string, password: string): Observable<AuthUser> {
        return this.http.post<AuthUser>(`${this.apiURLAuth}/login`, {
            email,
            password
        });
    }

    logout() {
        this.token.deleteToken();
        this.router.navigate(['/login']);
    }
}
