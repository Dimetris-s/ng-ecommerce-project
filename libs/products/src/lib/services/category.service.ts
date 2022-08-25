import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    apiURLCategories = environment.baseURL + '/category';
    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiURLCategories);
    }
    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(this.apiURLCategories, category);
    }

    deleteCategory(id: string): Observable<Category> {
        return this.http.delete<Category>(`${this.apiURLCategories}/${id}`);
    }

    getOneCategory(id: string): Observable<Category> {
        return this.http.get<Category>(`${this.apiURLCategories}/${id}`);
    }

    updateCategory(category: Category): Observable<Category> {
        return this.http.put<Category>(
            `${this.apiURLCategories}/${category.id}`,
            category
        );
    }
}
