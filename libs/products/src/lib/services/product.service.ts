import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    apiURLProducts = environment.baseURL + '/product';
    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiURLProducts);
    }
    createProduct(product: FormData): Observable<Product> {
        return this.http.post<Product>(this.apiURLProducts, product);
    }

    deleteProduct(id: string): Observable<Product> {
        return this.http.delete<Product>(`${this.apiURLProducts}/${id}`);
    }

    getOneProduct(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiURLProducts}/${id}`);
    }

    updateProduct(product: FormData, id: string): Observable<Product> {
        return this.http.put<Product>(`${this.apiURLProducts}/${id}`, product);
    }
}
