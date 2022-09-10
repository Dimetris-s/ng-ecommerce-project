import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductService } from '@dmtrsprod/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    endsubs$: Subject<any> = new Subject();

    constructor(
        private productService: ProductService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._loadProducts();
    }
    ngOnDestroy() {
        this.endsubs$.complete();
    }
    private _loadProducts() {
        this.productService
            .getProducts()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((products) => {
                this.products = products;
            });
    }

    private _deleteProduct(id: string) {
        this.productService
            .deleteProduct(id)
            .pipe(takeUntil(this.endsubs$))
            .subscribe(() => {
                this._loadProducts();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Product has been deleted!'
                });
            });
    }

    updateProduct(id: string) {
        this.router.navigateByUrl(`products/form/${id}`);
    }

    deleteProduct(id: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you wanna delete this product?',
            header: 'Delete product?',
            accept: () => {
                this._deleteProduct(id);
            }
        });
    }
}
