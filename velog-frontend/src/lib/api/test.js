import client from './client';

// test
export const userTest = () => client.get('/user/test');

export const adminTest = () => client.get('/admin/test');

export const generalTest = () => client.get('/test');
