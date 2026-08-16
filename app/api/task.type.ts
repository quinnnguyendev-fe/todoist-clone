// 1. Interface Task mới với các trường optional theo yêu cầu của bạn
export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // Định dạng YYYY-MM-DD hoặc ISO string
  label?: string;
  createdDate: string; // Tự động sinh kiểu ISO string
  priority?: number;
  isCompleted: boolean;
}

// Dữ liệu đầu vào khi tạo mới: Chỉ bắt buộc 'title'
export interface CreateTaskInput {
  title: string;
  description?: string;
  dueDate?: string;
  label?: string;
  priority?: number;
}

// Dữ liệu khi update: Cho phép sửa mọi thứ trừ id và ngày tạo
export type UpdateTaskInput = Partial<Omit<Task, 'id' | 'createdDate'>>;

export interface TaskFilters {
  status?: 'completed' | 'uncompleted' | 'all';
  dateScope?: 'today' | 'overdue' | 'all';
  label?: string;
  priority?: number;
  search?: string;
}

export interface DeleteTaskResponse {
  success: boolean;
  deletedId: string;
}

export type TaskState = {
    items: Task[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
}