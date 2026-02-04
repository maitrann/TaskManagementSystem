import { Routes } from '@angular/router';

import { TaskListPage } from './pages/task-list/task-list.page';

export const TASK_ROUTES: Routes = [
  {
    path: '',
    component: TaskListPage
  }
];
