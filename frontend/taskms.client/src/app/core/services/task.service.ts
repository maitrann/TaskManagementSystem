import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoTask } from '../models/todo_task.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl = `${environment.apiUrl}/Tasks`;

  constructor(private http: HttpClient) {}

  // GET: api/Tasks
  getAll(): Observable<TodoTask[]> {
    return this.http.get<TodoTask[]>(this.apiUrl);
  }

  // GET: api/Tasks/{id}
  getById(id: string): Observable<TodoTask> {
    return this.http.get<TodoTask>(`${this.apiUrl}/${id}`);
  }

  // POST: api/Tasks
  create(task: Partial<TodoTask>): Observable<TodoTask> {
    return this.http.post<TodoTask>(this.apiUrl, task);
  }

  // PUT: api/Tasks/{id}
  update(id: string, task: TodoTask): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, task);
  }

  // DELETE: api/Tasks/{id}
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
