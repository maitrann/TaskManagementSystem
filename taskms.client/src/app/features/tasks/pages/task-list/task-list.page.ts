import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService } from '../../../../core/services/task.service';
import { TodoTask } from '../../../../core/models/todo_task.model';
import { AuthService } from '../../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.css']
})
export class TaskListPage implements OnInit {
  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
  tasks: TodoTask[] = [];
  loading = false;
  // search / filter
  searchText: string = '';
  statusFilter: number | '' = '';
  // pagination
  currentPage = 1;
  pageSize = 5;
  get filteredTasks(): TodoTask[] {
    return this.tasks.filter(task => {
      const matchTitle =
        !this.searchText ||
        task.title?.toLowerCase().includes(this.searchText.toLowerCase());

      const matchStatus =
        this.statusFilter === '' || task.status === Number(this.statusFilter);

      return matchTitle && matchStatus;
    });
  }
  get paginatedTasks(): TodoTask[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTasks.slice(start, start + this.pageSize);
  }
  get totalPages(): number {
    return Math.ceil(this.filteredTasks.length / this.pageSize);
  }



  ngOnInit(): void {
    this.loadTasks();
  }
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }
  resetPage() {
    this.currentPage = 1;
  }



  loadTasks(): void {
    this.loading = true;
    this.taskService.getAll().subscribe({
      next: (data) => {
        console.log('API result:', data);
        this.tasks = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => (this.loading = false)
    });
  }
  modalTask: TodoTask = {
    title: '',
    description: '',
    status: 0
  } as TodoTask;

  editingTask: TodoTask | null = null;
  modalInstance: any;

  // goToDetail(id: string) {
  //   this.router.navigate(['/tasks', id]);
  // }

  deleteTask(id: string) {
    if (!confirm('Delete this task?')) return;

    this.taskService.delete(id).subscribe(() => {
      this.loadTasks();
    });
  }

  getStatusText(status: number): string {
    switch (status) {
      case 1: return 'In Progress';
      case 2: return 'Done';
      default: return 'Todo';
    }
  }

  getStatusClass(status: number): string {
    switch (status) {
      case 1: return 'in-progress';
      case 2: return 'done';
      default: return 'todo';
    }
  }

  changeStatus(task: TodoTask, event: Event) {
    if (!task?.id) {
      console.error('Task id is missing', task);
      return;
    }

    const select = event.target as HTMLSelectElement;
    const newStatus = Number(select.value);
    if (task.status === newStatus) return;
    const oldStatus = task.status;
    const updatedTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: newStatus,
      createdAt: task.createdAt
    };

    this.taskService.update(task.id, updatedTask).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: () => {
        task.status = oldStatus;
      }
    });

  }

  openCreateModal() {
    this.editingTask = null;
    this.modalTask = {
      title: '',
      description: '',
      status: 0
    } as TodoTask;

    this.showModal();
  }

  openEditModal(task: TodoTask) {
    this.editingTask = task;
    this.modalTask = { ...task };
    this.showModal();
  }

  showModal() {
    const modalEl = document.getElementById('taskModal');
    this.modalInstance = new bootstrap.Modal(modalEl);
    this.modalInstance.show();
  }

  saveTask() {
    if (!this.modalTask.title) return;

    if (this.editingTask) {
      this.taskService
        .update(this.editingTask.id!, this.modalTask)
        .subscribe(() => {
          this.loadTasks();
          this.modalInstance.hide();
        });
    } else {
      this.taskService.create(this.modalTask).subscribe(() => {
        this.loadTasks();
        this.modalInstance.hide();
      });
    }
  }

  resetModalForm(form?: any) {
    this.modalTask = {
      title: '',
      description: '',
      status: 0
    } as TodoTask;

    if (form) {
      form.resetForm(this.modalTask);
    }
  }


}
