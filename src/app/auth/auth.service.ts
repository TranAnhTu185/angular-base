// auth/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface LoginPayload { email: string; password: string; }
export interface LoginResponse { token: string;}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private TOKEN_KEY = 'token';
  private API = 'https://restful-booker.herokuapp.com/auth'; // đổi thành endpoint thật

  login(payload: LoginPayload) {
    return this.http.post<LoginResponse>(`${this.API}`, payload).pipe(
      tap(res => this.setToken(res.token))
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  } 

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
