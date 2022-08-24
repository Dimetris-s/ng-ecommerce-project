import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryService } from '@dmtrsprod/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

type CategoryForm = FormGroup<{
  name: FormControl<string>,
  icon: FormControl<string>,
}>

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit {
  form: CategoryForm;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private location: Location,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.invalid) {
      return;
    }
    const category: Category = {
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value
    };
    this.categoryService.createCategory(category).subscribe({
      next: (response) => {
        this.messageService.add(
          { severity: 'success', summary: 'Success!', detail: 'Category has successfully created!' });
        timer(2000).subscribe(done => {
          this.location.back();
        })
      },
      error: (error) => {
        this.messageService.add(
          { severity: 'error', summary: 'Error!', detail: 'Category has not created!' })
        console.log(error);
      }
    });
    console.log(this.categoryForm.name);
    console.log(this.categoryForm.icon);
  }

  goBack() {
    this.router.navigate(['/categories'])
  }

  get categoryForm() {
    return this.form.controls;
  }
}
