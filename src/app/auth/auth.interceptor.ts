// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Lấy token từ localStorage (hoặc service)
        const token = localStorage.getItem('token');

        let authReq = req;
        if (token) {
            authReq = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        // Xử lý response error
        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    console.error('Unauthorized - Token hết hạn hoặc không hợp lệ');
                    // Có thể redirect về login
                }
                return throwError(() => error);
            })
        );
    }
}
