import { Component, OnInit } from '@angular/core';
import { User, UserService } from '@dmtrsprod/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import * as countryLib from 'i18n-iso-countries';

declare const require;
@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {
    users: User[] = [];

    constructor(
        private userService: UserService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        countryLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
        this._loadUsers();
    }

    private _loadUsers() {
        this.userService.getUsers().subscribe((users) => {
            this.users = users.map((user) => ({
                ...user,
                country: countryLib.getName(user.country, 'en')
            }));
        });
    }

    private _deleteProduct(id: string) {
        this.userService.deleteUser(id).subscribe(() => {
            this._loadUsers();
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'User has been deleted!'
            });
        });
    }

    deleteUser(id: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you wanna delete this user?',
            header: 'Delete user?',
            accept: () => {
                this._deleteProduct(id);
            }
        });
    }
    updateUser(id: string) {
        this.router.navigateByUrl(`users/form/${id}`);
    }
}
