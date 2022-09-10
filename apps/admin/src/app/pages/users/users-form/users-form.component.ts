import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '@dmtrsprod/users';
import { Subject, takeUntil, timer } from 'rxjs';

type UserForm = FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    phone: FormControl<string>;
    isAdmin: FormControl<boolean>;
    street: FormControl<string>;
    apartment: FormControl<string>;
    zip: FormControl<string>;
    city: FormControl<string>;
    country: FormControl<string>;
}>;

@Component({
    selector: 'admin-users-form',
    templateUrl: './users-form.component.html'
})
export class UsersFormComponent implements OnInit, OnDestroy {
    form: UserForm;
    countries = [];
    isSubmitted = false;
    isEditing = false;
    userId: string | null;
    endsubs$: Subject<any> = new Subject();

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private messageService: MessageService,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._checkEditMode();
        this._getCountriesList();
    }
    ngOnDestroy() {
        this.endsubs$.complete();
    }
    private _getCountriesList() {
        this.countries = this.userService.getCountries();
    }
    private _checkEditMode() {
        this.route.params.subscribe(({ userId }) => {
            if (userId) {
                this.isEditing = true;
                this.userId = userId;
                this.userService.getOneUser(userId).subscribe((user) => {
                    this.userForm.name.setValue(user.name);
                    this.userForm.email.setValue(user.email);
                    this.userForm.phone.setValue(user.phone);
                    this.userForm.country.setValue(user.country);
                    this.userForm.street.setValue(user.street);
                    this.userForm.apartment.setValue(user.apartment);
                    this.userForm.zip.setValue(user.zip);
                    this.userForm.city.setValue(user.city);
                    this.userForm.isAdmin.setValue(user.isAdmin);
                    this.userForm.password.clearValidators();
                    this.userForm.password.updateValueAndValidity();
                });
            }
        });
    }
    private _initForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            phone: ['', Validators.required],
            country: [''],
            street: [''],
            apartment: [''],
            zip: [''],
            city: [''],
            isAdmin: [false]
        });
    }
    private _createUser(user: User) {
        this.userService
            .createUser(user)
            .pipe(takeUntil(this.endsubs$))
            .subscribe({
                next: (user) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success!',
                        detail: `User ${user.name} has successfully created!`
                    });
                    timer(2000).subscribe(() => {
                        this.location.back();
                    });
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error!',
                        detail: 'User has not created!'
                    });
                }
            });
    }
    private _updateUser(user: User) {
        this.userService
            .updateUser(user)
            .pipe(takeUntil(this.endsubs$))
            .subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success!',
                        detail: 'User has successfully updated!'
                    });
                    timer(2000).subscribe(() => {
                        this.location.back();
                    });
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error!',
                        detail: 'User has not updated!'
                    });
                }
            });
    }
    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) return;

        const user: User = {
            id: this.userId,
            name: this.userForm.name.value,
            email: this.userForm.email.value,
            password: this.userForm.password.value,
            phone: this.userForm.phone.value,
            country: this.userForm.country.value,
            street: this.userForm.street.value,
            apartment: this.userForm.apartment.value,
            zip: this.userForm.zip.value,
            city: this.userForm.city.value,
            isAdmin: this.userForm.isAdmin.value
        };

        if (this.isEditing) {
            this._updateUser(user);
        } else {
            this._createUser(user);
        }
    }

    goBack() {
        this.location.back();
    }
    get userForm() {
        return this.form.controls;
    }
}
