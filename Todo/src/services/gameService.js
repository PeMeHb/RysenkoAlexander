import { request } from './request';

export const createCount = data => request('game', 'post', data);

export const updateCount = data => request( 'game' ,'put', data);

export const getCounter = () => request('game', 'get');
