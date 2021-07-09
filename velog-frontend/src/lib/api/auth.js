import { deleteCookie } from '../constants/auth';
import client from './client';

// 로그인
export const login = (data) => client.post('/login', JSON.stringify(data));

// 로그아웃
export const logout = (data) => client.get('/logout');

// 회원가입
export const join = (data) => {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');

  console.log('http only쿠키 삭제가 안 되는데??');

  return client.post('/auth/join', JSON.stringify(data));
};

//소셜 로그인
export const socialLogin = (data) => client.post('/auth/oauth', JSON.stringify(data));
