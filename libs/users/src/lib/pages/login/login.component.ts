import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

type LoginForm = FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
}>;

@Component({
    selector: 'users-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    loginFormGroup: LoginForm;
    isSubmitted = false;
    authError = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private ls: LocalStorageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._initLoginForm();
    }

    private _initLoginForm() {
        this.loginFormGroup = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.loginFormGroup.invalid) return;
        this.authService
            .login(this.loginForm.email.value, this.loginForm.password.value)
            .subscribe(
                (user) => {
                    this.authError = '';
                    this.ls.setToken(user.token);
                    this.router.navigate(['/']);
                },
                (error: HttpErrorResponse) => {
                    if (error.status === 404 || error.status === 400) {
                        this.authError = 'Email or Password are invalid!';
                    } else {
                        this.authError = 'Something went wrong!';
                    }
                }
            );
    }

    get loginForm() {
        return this.loginFormGroup.controls;
    }
}
