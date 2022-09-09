import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthUser } from './types';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiURLAuth = environment.baseURL + '/auth';
    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<AuthUser> {
        return this.http.post<AuthUser>(`${this.apiURLAuth}/login`, {
            email,
            password
        });
    }
}
