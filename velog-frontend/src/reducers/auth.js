import { takeLatest } from '@redux-saga/core/effects';
import { createAction, handleActions } from 'redux-actions';
import * as authAPI from '../lib/api/auth';
import produce from 'immer';

import createFakeRequestSaga, { createRequestActionTypes, createRequestSaga, oauthLogin } from '../lib/createRequestSaga';

const [JOIN_REQUEST, JOIN_SUCCESS, JOIN_FAILURE] = createRequestActionTypes('JOIN');
const [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('LOGIN');
const [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createRequestActionTypes('LOGOUT');
const [LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE] = createRequestActionTypes('LOAD_USER');

export const OAUTH_REQUEST = 'OAUTH_REQUEST';
export const oauthAction = (data) => ({
  type: OAUTH_REQUEST,
  data,
});

// //액션 생성 함수
export const joinAction = createAction(JOIN_REQUEST, (data) => data);
export const loginAction = createAction(LOGIN_REQUEST, (data) => data);
export const logoutAction = createAction(LOGOUT_REQUEST, (data) => data);
export const loadUserAction = createAction(LOAD_USER_REQUEST, (data) => data);

// //사가 생성
const joinSaga = createRequestSaga(JOIN_REQUEST, authAPI.join);
const loginSaga = createRequestSaga(LOGIN_REQUEST, authAPI.login);
const logoutSaga = createRequestSaga(LOGOUT_REQUEST, authAPI.logout); //토큰재발급 요청
const loadUserSaga = createFakeRequestSaga(LOAD_USER_REQUEST, ''); //SSR 적용 안할 시 일단 가짜로..

export function* authSaga() {
  //이벤트 리스너!
  yield takeLatest(JOIN_REQUEST, joinSaga); //takeLatest는 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
  yield takeLatest(OAUTH_REQUEST, oauthLogin);
  yield takeLatest(LOAD_USER_REQUEST, loadUserSaga);
}

//초기 상태
const initialState = {
  joinDone: false,
  joinError: null,

  loginDone: false,
  loginError: null,

  logoutDone: false,
  logoutError: null,

  cmRespDto: null,
  error: null,
  principal: null,
};

//리듀서
const auth = handleActions(
  {
    //회원가입 시도
    [JOIN_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.joinDone = false;
        draft.joinError = null;
      }),
    // 회원가입 성공
    [JOIN_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      joinError: null,
      joinDone: true,
      cmRespDto: data,
    }),
    // 회원가입 실패
    [JOIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      joinError: error,
    }),
    //로그인 시도
    [LOGIN_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.loginDone = false;
        draft.loginError = null;
        draft.principal = null;
      }),
    //로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.loginDone = true;
        draft.loginError = null;
        draft.principal = data.data;
      }),
    //로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loginError: error,
    }),
    //로그아웃 시도
    [LOGOUT_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.logoutDone = false;
        draft.logoutError = null;
      }),
    //로그아웃 성공
    [LOGOUT_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      cmRespDto: data,
      logoutDone: true,
      logoutError: null,
      loginDone: false,
      principal: null,
    }),
    //로그아웃 실패
    [LOGOUT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      logoutError: error,
    }),

    [LOAD_USER_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.loginDone = false;
      }),
    [LOAD_USER_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      loginDone: true,
    }),
    [LOAD_USER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      // logoutError: error,
      loginDone: false,
    }),
  },
  initialState,
);

export default auth;
