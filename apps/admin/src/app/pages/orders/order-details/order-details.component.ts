import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from '@dmtrsprod/orders';
import { ActivatedRoute } from '@angular/router';
import { ORDERS_STATUS } from '../orders.constants';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'admin-order-details',
    templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {
    order: Order;
    selectedStatus: string;
    ordersStatuses = [];

    constructor(
        private orderService: OrderService,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._mapStatuses();
        this._getOrder();
    }

    private _mapStatuses() {
        this.ordersStatuses = Object.keys(ORDERS_STATUS).map((key) => ({
            id: key,
            label: ORDERS_STATUS[key].value
        }));
    }

    private _getOrder() {
        this.route.params.subscribe(({ id }) => {
            this.orderService.getOneOrder(id).subscribe((order) => {
                this.order = order;
                this.selectedStatus = this.order.status;
            });
        });
    }
    private _changeOrderStatus(status: string) {
        this.orderService.updateOrderStatus(this.order.id, status).subscribe(
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
