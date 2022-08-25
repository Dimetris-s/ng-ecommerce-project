import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from '@dmtrsprod/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit {
    public categories: Category[];
    constructor(
        private categoryService: CategoryService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._loadCategories();
    }

    private _loadCategories() {
        this.categoryService.getCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }

    deleteCategory(id) {
        this.confirmationService.confirm({
            message: 'Are you sure that you wanna delete this category?',
            header: 'Delete category?',
            accept: () => {
                this._deleteCategory(id);
            }
        });
    }

    updateCategory(id) {
        this.router.navigateByUrl(`categories/form/${id}`);
    }

    private _deleteCategory(id: string) {
        this.categoryService.deleteCategory(id).subscribe(() => {
            this._loadCategories();
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Category has been deleted!'
            });
        });
    }
}
