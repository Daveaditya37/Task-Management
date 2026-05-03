import { api } from "../lib/axios";

import type {
  IBeSignupResponse,
  IBeAuth,
  IBeMembersResponse,
  IBeProjectsResponse,
  IBeTasksResponse,
  IBeTaskResponse,
  IBeProjectResponse,
  ICreateProjectPayload,
  ICreateTaskPayload,
  IBeDashboardResponse,
  
} from "../interfaces";

import type {
  LoginFormValues,
  SignupFormValues,
} from "../validate";


// ======================================
// AUTH
// ======================================

export const login = async (
  payload: LoginFormValues
) => {

  const response =
    await api.post<IBeAuth>(
      "/auth/login",
      payload
    );

  return response;
};


export const signup = async (
  payload: SignupFormValues
) => {

  const response =
    await api.post<IBeSignupResponse>(
      "/auth/signup",
      payload
    );

  return response;
};


// ======================================
// MEMBERS
// ======================================

export const getMembers = async () => {

  const response =
    await api.get<IBeMembersResponse>(
      "/users/members"
    );

  return response;
};


// ======================================
// PROJECTS
// ======================================

export const getProjects = async () => {

  const response =
    await api.get<IBeProjectsResponse>(
      "/projects"
    );

  return response;
};


export const createProject = async (
  payload: ICreateProjectPayload
) => {

  const response =
    await api.post<IBeProjectResponse>(
      "/projects",
      payload
    );

  return response;
};


// ======================================
// TASKS
// ======================================

export const getTasks = async () => {

  const response =
    await api.get<IBeTasksResponse>(
      "/tasks"
    );

  return response;
};


export const getMyTasks = async () => {

  const response =
    await api.get<IBeTasksResponse>(
      "/tasks/member/my-tasks"
    );

  return response;
};


export const createTask = async (
  payload: ICreateTaskPayload
) => {

  const response =
    await api.post<IBeTaskResponse>(
      "/tasks",
      payload
    );

  return response;
};


export const startTask = async (
  id: string
) => {

  const response =
    await api.patch<IBeTaskResponse>(
      `/tasks/${id}/start`
    );

  return response;
};


export const completeTask = async (
  id: string
) => {

  const response =
    await api.patch<IBeTaskResponse>(
      `/tasks/${id}/complete`
    );

  return response;
};

export const getAdminDashboard = async () => {
  const response = await api.get<IBeDashboardResponse>(
    "/dashboard/dashboard"
  );

  return response;
};

