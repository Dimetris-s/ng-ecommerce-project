import { Component } from '@angular/core';
import { AuthService } from '@dmtrsprod/users';

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    constructor(private auth: AuthService) {}

    logoutUser() {
        this.auth.logout();
    }
}
