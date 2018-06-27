import { request } from './request';

export const createCount = data => request('gameCount', 'post', data);

export const updateCount = data => request('put', data);

export const getCount = () => request('game', 'get');
