import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Order } from '../models/order';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    apiURLOrders = environment.baseURL + '/order';

    constructor(private http: HttpClient) {}

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiURLOrders);
    }

    createOrder(Order: Order): Observable<Order> {
        return this.http.post<Order>(this.apiURLOrders, Order);
    }

    deleteOrder(id: string): Observable<Order> {
        return this.http.delete<Order>(`${this.apiURLOrders}/${id}`);
    }

    getOneOrder(id: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiURLOrders}/${id}`);
    }

    updateOrderStatus(id: string, status: string): Observable<Order> {
        return this.http.put<Order>(`${this.apiURLOrders}/${id}`, { status });
    }

    updateOrder(Order: Order): Observable<Order> {
        return this.http.put<Order>(`${this.apiURLOrders}/${Order.id}`, Order);
    }
}
