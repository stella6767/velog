import { takeLatest } from '@redux-saga/core/effects';
import { createAction, handleActions } from 'redux-actions';
import * as authAPI from '../lib/api/auth';
import produce from 'immer';

import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';

const [JOIN_REQUEST, JOIN_SUCCESS, JOIN_FAILURE] = createRequestActionTypes('JOIN');
const [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('LOGIN');
const [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createRequestActionTypes('LOGOUT');

// //액션 생성 함수
export const joinAction = createAction(JOIN_REQUEST, (data) => data);
export const loginAction = createAction(LOGIN_REQUEST, (data) => data);
export const logoutAction = createAction(LOGOUT_REQUEST, (data) => data);

// //사가 생성
const joinSaga = createRequestSaga(JOIN_REQUEST, authAPI.join);
const loginSaga = createRequestSaga(LOGIN_REQUEST, authAPI.login);
const logoutSaga = createRequestSaga(LOGOUT_REQUEST, authAPI.logout); //토큰재발급 요청

export function* authSaga() {
  //이벤트 리스너!
  yield takeLatest(JOIN_REQUEST, joinSaga); //takeLatest는 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
}

//초기 상태
const initialState = {
  joinDone: false,
  joinError: null,

  loginDone: false,
  loginError: null,

  logoutDone: false,
  logoutError: null,

  cmRespDto: {},
  error: {},
  principal: {},
};

//리듀서
const auth = handleActions(
  {
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
    [LOGIN_SUCCESS]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.loginDone = true;
        draft.loginError = null;
        draft.principal = data.data;
      }),
    // [LOGIN_SUCCESS]: (state, { payload: data }) => ({
    //   ...state,
    //   loginError: null,
    //   loginDone: true,
    //   cmRespDto: data,
    //   principal: data.data,
    // }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loginError: error,
    }),
    [LOGOUT_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      cmRespDto: data,
      logoutDone: false,
      loginDone: false,
    }),

    [LOGOUT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      logoutError: error,
    }),
  },
  initialState,
);

export default auth;
