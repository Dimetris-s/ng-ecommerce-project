import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(private router: Router, private ls: LocalStorageService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.ls.getToken();
        if (token) {
            try {
                const tokenDecode = JSON.parse(atob(token.split('.')[1]));
                if (
                    tokenDecode.isAdmin &&
                    !this._tokenExpired(tokenDecode.exp)
                ) {
                    return true;
                }
                return false;
            } catch (e) {
                this.router.navigate(['/login']);
                return false;
            }
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

    private _tokenExpired(expiration: number): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiration;
    }
}
