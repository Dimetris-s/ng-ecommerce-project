import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order, OrderService } from '@dmtrsprod/orders';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDERS_STATUS } from '../orders.constants';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html'
})
export class OrdersListComponent implements OnInit, OnDestroy {
    orders: Order[] = [];
    orderStatus = ORDERS_STATUS;
    endsubs$: Subject<any> = new Subject();

    constructor(
        private orderService: OrderService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._getOrders();
    }
    ngOnDestroy() {
        this.endsubs$.complete();
    }
    private _getOrders() {
        this.orderService.getOrders().subscribe((orders) => {
            this.orders = orders;
        });
    }

    showDetails(id: string) {
        this.router.navigateByUrl(`orders/${id}`);
    }

    deleteOrder(id: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you wanna delete this order?',
            header: 'Delete order?',
            accept: () => {
                this._deleteCategory(id);
            }
        });
    }

    private _deleteCategory(id: string) {
        this.orderService
            .deleteOrder(id)
            .pipe(takeUntil(this.endsubs$))
            .subscribe(() => {
                this._getOrders();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Order has been deleted!'
                });
            });
    }
}
