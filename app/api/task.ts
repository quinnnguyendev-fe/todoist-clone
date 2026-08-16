import type { CreateTaskInput, DeleteTaskResponse, Task, TaskFilters, UpdateTaskInput } from "./task.type";

const LOCAL_STORAGE_KEY = 'todo_tasks';

const _getRawTasks = (): Task[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const _saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
};

// Hàm đưa ngày về 00:00:00 để so sánh chính xác
const startOfDay = (dateString: string | Date): Date => {
  const d = new Date(dateString);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * 2. CẬP NHẬT VALIDATE TRONG BỘ LỌC (Fix lỗi TS do dữ liệu có thể undefined)
 */
export const taskFilterUtils = {
  isToday: (taskDateStr?: string): boolean => {
    if (!taskDateStr) return false; // Trả về false nếu không có dueDate
    return startOfDay(taskDateStr).getTime() === startOfDay(new Date()).getTime();
  },

  isOverdue: (taskDateStr?: string, isCompleted?: boolean): boolean => {
    if (!taskDateStr || isCompleted) return false; // Trả về false nếu không có dueDate hoặc đã xong
    return startOfDay(taskDateStr).getTime() < startOfDay(new Date()).getTime();
  },

  applyFilters: (tasks: Task[], filters?: TaskFilters): Task[] => {
    if (!filters) return tasks;

    return tasks.filter(task => {
      // Lọc theo trạng thái hoàn thành
      if (filters.status === 'completed' && !task.isCompleted) return false;
      if (filters.status === 'uncompleted' && task.isCompleted) return false;

      // Lọc theo phạm vi ngày (An toàn với trường optional)
      if (filters.dateScope === 'today' && !taskFilterUtils.isToday(task.dueDate)) return false;
      if (filters.dateScope === 'overdue' && !taskFilterUtils.isOverdue(task.dueDate, task.isCompleted)) return false;

      // Lọc theo nhãn (Sử dụng Optional Chaining ?. để tránh crash nếu label undefined)
      if (filters.label && task.label?.toLowerCase() !== filters.label.toLowerCase()) return false;

      // Lọc theo độ ưu tiên
      if (filters.priority !== undefined && task.priority !== filters.priority) return false;

      // Tìm kiếm theo từ khóa (An toàn với các trường optional bằng cách dùng ?? '')
      if (filters.search) {
        const keyword = filters.search.toLowerCase();
        const matchTitle = task.title.toLowerCase().includes(keyword);
        const matchDesc = (task.description ?? '').toLowerCase().includes(keyword);
        if (!matchTitle && !matchDesc) return false;
      }

      return true;
    });
  }
};

/**
 * 3. ĐỐI TƯỢNG API HOÀN CHỈNH
 */
export const todoApi = {
  getList: async (filters?: TaskFilters): Promise<Task[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allTasks = _getRawTasks();
        const filteredTasks = taskFilterUtils.applyFilters(allTasks, filters);
        
        // Sắp xếp an toàn khi priority có thể bị undefined (coi undefined là priority = 0 hoặc thấp nhất)
        const sortedTasks = filteredTasks.sort((a, b) => {
          if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
          const pA = a.priority ?? 0;
          const pB = b.priority ?? 0;
          return pB - pA;
        });

        resolve(sortedTasks);
      }, 200);
    });
  },

  getOne: async (id: string): Promise<Task> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tasks = _getRawTasks();
        const task = tasks.find(t => t.id === id);
        if (task) {
          resolve(task);
        } else {
          reject(new Error(`Không tìm thấy task với ID: ${id}`));
        }
      }, 200);
    });
  },

  /**
   * CẬP NHẬT HÀM CREATE: Chấp nhận các giá trị undefined từ client truyền vào
   * nhưng gán cấu trúc rõ ràng trước khi lưu vào Storage.
   */
  create: async (taskData: CreateTaskInput): Promise<Task> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = _getRawTasks();
        
        const newTask: Task = {
          id: Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
          title: taskData.title,
          description: taskData.description, // Tự động nhận string hoặc undefined
          dueDate: taskData.dueDate,         // Tự động nhận string hoặc undefined
          label: taskData.label,             // Tự động nhận string hoặc undefined
          priority: taskData.priority,       // Tự động nhận number hoặc undefined
          createdDate: new Date().toISOString(),
          isCompleted: false 
        };

        tasks.push(newTask);
        _saveTasks(tasks);
        resolve(newTask);
      }, 200);
    });
  },

  edit: async (id: string, updatedFields: UpdateTaskInput): Promise<Task> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tasks = _getRawTasks();
        const taskIndex = tasks.findIndex(t => t.id === id);

        if (taskIndex !== -1) {
          const updatedTask: Task = { 
            ...tasks[taskIndex], 
            ...updatedFields 
          };
          tasks[taskIndex] = updatedTask;
          
          _saveTasks(tasks);
          resolve(updatedTask);
        } else {
          reject(new Error(`Không thể cập nhật. Không tìm thấy task với ID: ${id}`));
        }
      }, 200);
    });
  },

  updateStatus: async (id: string, isCompleted: boolean): Promise<Task> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tasks = _getRawTasks();
        const taskIndex = tasks.findIndex(t => t.id === id);

        if (taskIndex !== -1) {
          tasks[taskIndex].isCompleted = isCompleted;
          _saveTasks(tasks);
          resolve(tasks[taskIndex]);
        } else {
          reject(new Error(`Không thể cập nhật trạng thái. Không tìm thấy task với ID: ${id}`));
        }
      }, 200);
    });
  },

  delete: async (id: string): Promise<DeleteTaskResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tasks = _getRawTasks();
        const initialLength = tasks.length;
        
        const filteredTasks = tasks.filter(t => t.id !== id);

        if (filteredTasks.length < initialLength) {
          _saveTasks(filteredTasks);
          resolve({ success: true, deletedId: id });
        } else {
          reject(new Error(`Không thể xóa. Không tìm thấy task với ID: ${id}`));
        }
      }, 200);
    });
  }
};