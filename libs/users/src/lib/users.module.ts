import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

export const usersRoutes: Route[] = [
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(usersRoutes),
        HttpClientModule,
        InputTextModule,
        ButtonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [LoginComponent]
})
export class UsersModule {}
