import { request } from './request';

export const login = data => request('public/login', 'post', data);

export const checkUser = () => request('public/checkUser', 'get');

export const create = data => request('public/user', 'post', data);

export const logout = () => request('logout');

export const update = data => request('user', 'put', data);

export const updateCount = data => request( 'users' ,'put', data);

export const getCounter = () => request('users', 'get');
