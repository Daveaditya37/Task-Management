export type Role = "ADMIN" | "MEMBER";


// ======================================
// GENERIC RESPONSE
// ======================================

export interface AxiosResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}


// ======================================
// USER
// ======================================

export interface IBeUser {
  id: string;

  name: string;

  email: string;

  role: Role;

  createdAt?: string;

  updatedAt?: string;
}


// ======================================
// AUTH
// ======================================

// LOGIN RESPONSE
// { success, token, user }

export interface IBeAuth {
  success: boolean;

  token: string;

  user: IBeUser;
}


// SIGNUP RESPONSE
// { success, user }

export interface IBeSignupResponse {
  success: boolean;

  user: IBeUser;
}


// ======================================
// TASK
// ======================================

export type Priority =
  | "HIGH"
  | "MEDIUM"
  | "LOW";


export type Status =
  | "TODO"
  | "IN_PROGRESS"
  | "COMPLETED";


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


// ======================================
// PROJECT
// ======================================

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


// ======================================
// MEMBERS RESPONSE
// ======================================

export interface IBeMembersResponse {
  success: boolean;

  members: IBeUser[];
}


// ======================================
// PROJECT RESPONSES
// ======================================

export interface IBeProjectsResponse {
  success: boolean;

  projects: IProject[];
}


export interface IBeProjectResponse {
  success: boolean;

  project: IProject;
}


// ======================================
// TASK RESPONSES
// ======================================

export interface IBeTasksResponse {
  success: boolean;

  tasks: ITask[];
}


export interface IBeTaskResponse {
  success: boolean;

  task: ITask;
}


// ======================================
// CREATE PROJECT PAYLOAD
// ======================================

export interface ICreateProjectPayload {
  title: string;

  description: string;
}


// ======================================
// CREATE TASK PAYLOAD
// ======================================

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


// ======================================
// LOGIN PAYLOAD
// ======================================

export interface ILoginPayload {
  email: string;

  password: string;
}


// ======================================
// SIGNUP PAYLOAD
// ======================================

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