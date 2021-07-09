import client from './client';

//개인 벨로그 정보 블러오기
export const user = (userId) => client.get(`/user/${userId}`);

export const likelist = (page) => client.get(`/user/likelist?page=${page}`);
