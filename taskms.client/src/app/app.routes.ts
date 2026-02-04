import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // 👉 vừa mở web → auth
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },

  // 👉 signin / signup
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes')
        .then(m => m.AUTH_ROUTES)
  },

  // 👉 task-list (login mới vào)
  {
    path: 'tasks',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/tasks/task.routes')
        .then(m => m.TASK_ROUTES)
  },

  // 👉 fallback
  {
    path: '**',
    redirectTo: 'auth'
  }
];
