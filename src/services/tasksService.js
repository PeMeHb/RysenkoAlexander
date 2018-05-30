import { request } from './request';

export const createTask = data => request('tasks', 'post', data);

export const updateTask = (id, data) => request(`tasks/${id}`, 'put', data);

export const getTasks = () => request('tasks');

export const getTask = id => request(`tasks/${id}`);

export const removeTask = id => request(`tasks/${id}`, 'delete');

export const getTasksInfo = () => request('info');
