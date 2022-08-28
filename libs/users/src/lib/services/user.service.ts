import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    apiURLUsers = environment.baseURL + '/user';
    constructor(private http: HttpClient) {}

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
}
