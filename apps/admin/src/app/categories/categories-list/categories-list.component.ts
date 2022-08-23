import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from '@dmtrsprod/products';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit {
    public categories: Category[];
    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }
}
