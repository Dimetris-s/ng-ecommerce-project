import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category, CategoryService } from '@dmtrsprod/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit, OnDestroy {
    public categories: Category[];
    endsubs$: Subject<any> = new Subject();

    constructor(
        private categoryService: CategoryService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._loadCategories();
    }
    ngOnDestroy() {
        this.endsubs$.complete();
    }
    private _loadCategories() {
        this.categoryService
            .getCategories()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((categories) => {
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
        this.categoryService
            .deleteCategory(id)
            .pipe(takeUntil(this.endsubs$))
            .subscribe(() => {
                this._loadCategories();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Category has been deleted!'
                });
            });
    }
}
