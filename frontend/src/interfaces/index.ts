export type Role = "ADMIN" | "MEMBER";
export interface AxiosResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
export interface IBeUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}
export interface IBeAuth {
  success: boolean;
  token: string;
  user: IBeUser;
}
export interface IBeSignupResponse {
  success: boolean;
  user: IBeUser;
}
export type Priority = "HIGH" | "MEDIUM" | "LOW";
export type Status = "TODO" | "IN_PROGRESS" | "COMPLETED";
export interface ITask {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  estimatedTime: number | null;
  startedAt: string | null;
  completedAt: string | null;
  dueDate: string | null;
  assignedTo: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  assignee?: IBeUser;
  project?: IProject;
}
export interface IProject {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  creator?: IBeUser;
  tasks?: ITask[];
}
export interface IBeMembersResponse {
  success: boolean;
  members: IBeUser[];
}
export interface IBeProjectsResponse {
  success: boolean;
  projects: IProject[];
}
export interface IBeProjectResponse {
  success: boolean;
  project: IProject;
}
export interface IBeTasksResponse {
  success: boolean;
  tasks: ITask[];
}
export interface IBeTaskResponse {
  success: boolean;
  task: ITask;
}
export interface ICreateProjectPayload {
  title: string;
  description: string;
}
export interface ICreateTaskPayload {
  title: string;
  description?: string;
  priority: Priority;
  assignedTo: string;
  projectId: string | null;
  isPrivate: boolean;
  estimatedTime?: number;
  dueDate?: string;
}
export interface ILoginPayload {
  email: string;
  password: string;
}
export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
}
export interface IBeDashboardResponse {
  success: boolean;
  data: {
    totalProjects: number;
    activeTasks: number;
    completedTasks: number;
    teamMembers: number;
  };
}
