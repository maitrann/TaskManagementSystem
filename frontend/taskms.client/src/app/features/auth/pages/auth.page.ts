import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.page.html'
})
export class AuthPage {

  username = '';
  password = '';
  isLogin = true;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  submit() {
    this.error = '';

    if (!this.username || !this.password) {
      this.error = 'Username and password are required';
      return;
    }

    const payload = {
      username: this.username,
      password: this.password
    };

    if (this.isLogin) {
      this.authService.login(payload).subscribe({
        next: (res: any) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/tasks']);
        },
        error: () => {
          this.error = 'Invalid username or password';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.authService.register(payload).subscribe({
        next: () => {
          this.isLogin = true;
          alert('Register success, please login');
        },
        error: (err) => {
          console.log('REGISTER ERROR:', err.error);
          this.error = err?.error?.message ||
                    err?.error ||
                    'Register failed';
          this.cdr.detectChanges();
        }
      });
    }
  }
}
