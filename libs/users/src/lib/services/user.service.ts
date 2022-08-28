import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import * as countryLib from 'i18n-iso-countries';

declare const require: any;

@Injectable({
    providedIn: 'root'
})
export class UserService {
    apiURLUsers = environment.baseURL + '/user';
    constructor(private http: HttpClient) {
        countryLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiURLUsers);
    }
    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiURLUsers, user);
    }

    deleteUser(id: string): Observable<User> {
        return this.http.delete<User>(`${this.apiURLUsers}/${id}`);
    }

    getOneUser(id: string): Observable<User> {
        return this.http.get<User>(`${this.apiURLUsers}/${id}`);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
    }
    getCountries(): { id: string; name: string }[] {
        return Object.entries(
            countryLib.getNames('en', { select: 'official' })
        ).map((entry) => {
            return {
                id: entry[0],
                name: entry[1]
            };
        });
    }

    getCountry(countryKey: string): string {
        return countryLib.getName(countryKey, 'en');
    }
}
