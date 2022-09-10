import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order, OrderService } from '@dmtrsprod/orders';
import { ActivatedRoute } from '@angular/router';
import { ORDERS_STATUS } from '../orders.constants';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-order-details',
    templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
    order: Order;
    selectedStatus: string;
    ordersStatuses = [];
    endsubs$: Subject<any> = new Subject();

    constructor(
        private orderService: OrderService,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._mapStatuses();
        this._getOrder();
    }
    ngOnDestroy() {
        this.endsubs$.complete();
    }
    private _mapStatuses() {
        this.ordersStatuses = Object.keys(ORDERS_STATUS).map((key) => ({
            id: key,
            label: ORDERS_STATUS[key].value
        }));
    }

    private _getOrder() {
        this.route.params.subscribe(({ id }) => {
            this.orderService
                .getOneOrder(id)
                .pipe(takeUntil(this.endsubs$))
                .subscribe((order) => {
                    this.order = order;
                    this.selectedStatus = this.order.status;
                });
        });
    }
    private _changeOrderStatus(status: string) {
        this.orderService
            .updateOrderStatus(this.order.id, status)
            .pipe(takeUntil(this.endsubs$))
            .subscribe(
                () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Status has been updated!'
                    });
                },
                () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Status has not been updated!'
                    });
                }
            );
    }

    onStatusChange(event) {
        const { value } = event;
        this._changeOrderStatus(value);
    }
}
