import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '@dmtrsprod/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
    products: Product[] = [];
    constructor(
        private productService: ProductService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._loadProducts();
    }

    private _loadProducts() {
        this.productService.getProducts().subscribe((products) => {
            this.products = products;
        });
    }

    private _deleteProduct(id: string) {
        this.productService.deleteProduct(id).subscribe(() => {
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
