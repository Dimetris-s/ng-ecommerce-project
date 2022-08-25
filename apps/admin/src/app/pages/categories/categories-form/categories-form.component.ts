import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { Category, CategoryService } from '@dmtrsprod/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

type CategoryForm = FormGroup<{
    name: FormControl<string>;
    icon: FormControl<string>;
    color: FormControl<string>;
}>;

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit {
    form: CategoryForm | undefined;
    isSubmitted = false;
    isEditing = false;
    categoryId: string | null;

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private messageService: MessageService,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required],
            color: ['#fff']
        });
        this._checkEditMode();
    }

    private _updateCategory(category: Category) {
        this.categoryService.updateCategory(category).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success!',
                    detail: 'Category has successfully updated!'
                });
                timer(2000).subscribe(() => {
                    this.location.back();
                });
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error!',
                    detail: 'Category has not updated!'
                });
            }
        });
    }
    private _createCategory(category: Category) {
        this.categoryService.createCategory(category).subscribe({
            next: (category) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success!',
                    detail: `Category ${category.name} has successfully created!`
                });
                timer(2000).subscribe(() => {
                    this.location.back();
                });
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error!',
                    detail: 'Category has not created!'
                });
            }
        });
    }

    private _checkEditMode() {
        this.route.params.subscribe(({ categoryId }) => {
            if (categoryId) {
                this.isEditing = true;
                this.categoryId = categoryId;
                this.categoryService
                    .getOneCategory(this.categoryId)
                    .subscribe((category) => {
                        this.categoryForm.name.setValue(category.name);
                        this.categoryForm.icon.setValue(category.icon);
                        this.categoryForm.color.setValue(category.color);
                    });
            }
        });
    }
    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        const category: Category = {
            id: this.categoryId,
            name: this.categoryForm.name.value,
            icon: this.categoryForm.icon.value,
            color: this.categoryForm.color.value
        };
        if (this.isEditing) {
            this._updateCategory(category);
        } else {
            this._createCategory(category);
        }
    }
    goBack() {
        this.router.navigate(['/categories']);
    }

    get categoryForm() {
        return this.form.controls;
    }
}
