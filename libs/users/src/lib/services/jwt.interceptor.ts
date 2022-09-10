import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { environment } from '@env/environment.prod';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private ls: LocalStorageService) {}
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        console.log(request);
        const token = this.ls.getToken();
        const isAPIUrl = request.url.startsWith(environment.baseURL);
        if (token && isAPIUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
}
