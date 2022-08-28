import { Component, OnInit } from '@angular/core';
import { User, UserService } from '@dmtrsprod/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
        this._loadUsers();
    }

    private _loadUsers() {
        this.userService.getUsers().subscribe((users) => {
            this.users = users;
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
    getCountryName(countryKey: string) {
        if (countryKey) return this.userService.getCountry(countryKey);
    }
}
