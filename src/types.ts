export interface ElmaAppItem {
  __id: string;
  __name?: string;
  __createdAt?: string;
  __updatedAt?: string;
  __createdBy?: { __id: string; __name: string };
  [key: string]: unknown;
}

export interface ElmaTask {
  id: string;
  subject?: string;
  description?: string;
  status?: string;
  assignee?: { __id: string; __name: string };
  createdAt?: string;
  dueDate?: string;
}
