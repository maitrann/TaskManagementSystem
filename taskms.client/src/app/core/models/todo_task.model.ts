import { TaskStatus } from '../enums/task_status.enum';

export interface TodoTask {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
}
