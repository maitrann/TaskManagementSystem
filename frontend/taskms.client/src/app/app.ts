import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  username$!: Observable<string | null>;

  constructor(private authService: AuthService) {
    this.username$ = this.authService.username$;
  }

  logout() {
    // localStorage.clear();
    this.authService.logout();
    location.href = '/login';
  }
}
