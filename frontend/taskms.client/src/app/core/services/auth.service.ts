import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/Auth`;
  private usernameSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('username')
  );

  username$ = this.usernameSubject.asObservable();


  constructor(private http: HttpClient, private router: Router) { }

  register(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  setSession(token: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    this.usernameSubject.next(username);
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.usernameSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
