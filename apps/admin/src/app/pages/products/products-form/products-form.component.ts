import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { Category, CategoryService, ProductService } from '@dmtrsprod/products';
import { Subject, takeUntil, timer } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

type ProductForm = FormGroup<{
    name: FormControl<string>;
    price: FormControl<number>;
    brand: FormControl<string>;
    countInStock: FormControl<number>;
    category: FormControl<string>;
    isFeatured: FormControl<boolean>;
    description: FormControl<string>;
    richDescription: FormControl<string>;
    image: FormControl;
}>;

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html'
})
export class ProductsFormComponent implements OnInit, OnDestroy {
    form: ProductForm;
    isSubmitted = false;
    isEditing = false;
    categories: Category[] = [];
    previewImage: string | ArrayBuffer;
    productId: string | null;
    endsubs$: Subject<any> = new Subject();

    constructor(
        private fb: FormBuilder,
        private categoryService: CategoryService,
        private productService: ProductService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._loadCategories();
        this._checkEditMode();
    }
    ngOnDestroy() {
        this.endsubs$.complete();
    }
    private _checkEditMode() {
        this.route.params.subscribe(({ productId }) => {
            if (productId) {
                this.isEditing = true;
                this.productId = productId;
                this.productService
                    .getOneProduct(productId)
                    .subscribe((product) => {
                        this.form.controls.name.setValue(product.name);
                        this.form.controls.brand.setValue(product.brand);
                        this.form.controls.price.setValue(product.price);
                        this.form.controls.category.setValue(
                            product.category.id
                        );
                        this.form.controls.countInStock.setValue(
                            product.countInStock
                        );
                        this.form.controls.description.setValue(
                            product.description
                        );
                        this.form.controls.richDescription.setValue(
                            product.richDescription
                        );
                        this.form.controls.isFeatured.setValue(
                            product.isFeatured
                        );
                        this.previewImage = product.image;
                        this.productForm.image.clearValidators();
                        this.productForm.image.updateValueAndValidity();
                    });
            }
        });
    }
    private _loadCategories() {
        this.categoryService
            .getCategories()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((categories) => (this.categories = categories));
    }
    private _initForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            price: [0, Validators.required],
            category: ['', Validators.required],
            countInStock: [0, Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: [null, Validators.required],
            isFeatured: [false]
        });
    }
    private _createProduct(productData: FormData) {
        this.productService
            .createProduct(productData)
            .pipe(takeUntil(this.endsubs$))
            .subscribe({
                next: (product) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success!',
                        detail: `Product ${product.name} has successfully created!`
                    });
                    timer(2000).subscribe(() => {
                        this.location.back();
                    });
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error!',
                        detail: 'Product has not created!'
                    });
                }
            });
    }

    private _updateProduct(productData: FormData) {
        this.productService
            .updateProduct(productData, this.productId)
            .subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success!',
                        detail: 'Product has successfully updated!'
                    });
                    timer(2000).subscribe(() => {
                        this.location.back();
                    });
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error!',
                        detail: 'Product has not updated!'
                    });
                }
            });
    }

    onImageChange(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        if (file) {
            this.form.patchValue({ image: file });
            this.form.get('image').updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.onload = () => (this.previewImage = fileReader.result);
            fileReader.readAsDataURL(file);
        }
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) return;
        const formData = new FormData();
        Object.keys(this.productForm).forEach((key) => {
            formData.append(key, this.productForm[key].value);
        });
        if (this.isEditing) {
            this._updateProduct(formData);
        } else {
            this._createProduct(formData);
        }
    }
    goBack() {
        this.location.back();
    }

    get productForm() {
        return this.form.controls;
    }
}
