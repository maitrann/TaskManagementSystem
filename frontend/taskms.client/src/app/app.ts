import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  username = signal<string | null>(null);

  constructor() {
    this.username.set(localStorage.getItem('username'));
  }

  logout() {
    localStorage.clear();
    location.href = '/login';
  }
}
