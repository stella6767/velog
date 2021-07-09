import { takeLatest } from '@redux-saga/core/effects';
import React from 'react';
import { createAction, handleActions } from 'redux-actions';
import * as testAPI from '../lib/api/test';
import { createRequestActionTypes, createRequestSaga } from '../lib/createRequestSaga';

const initialState = {
  done: {},
  error: {}, //오브젝트로 받자.
};

const [TEST_REQUST, TEST_SUCCESS, TEST_FAILURE] = createRequestActionTypes('TEST');
export const ADMIN_REQUEST = 'ADMIN_REQUEST';
export const TEST2_REQUEST = 'TEST2_REQUEST';

// const [ADMIN_REQUST, ADMIN_SUCCESS, ADMIN_FAILURE] = createRequestActionTypes('ADMIN');
//const [TEST2_REQUST, TEST2_SUCCESS, TEST2_FAILURE] = createRequestActionTypes('TEST2');

//액션 생성 함수
export const testAction = createAction(TEST_REQUST);
export const test2Action = createAction(TEST2_REQUEST);
export const adminTestAction = createAction(ADMIN_REQUEST);

//사가 생성
const getTestSaga = createRequestSaga(TEST_REQUST, testAPI.userTest);
const getTest2Saga = createRequestSaga(TEST2_REQUEST, testAPI.generalTest);
const getAdminSaga = createRequestSaga(ADMIN_REQUEST, testAPI.adminTest);

export function* testSaga() {
  //이벤트 리스너!
  yield takeLatest(TEST_REQUST, getTestSaga);
  yield takeLatest(ADMIN_REQUEST, getAdminSaga);
  yield takeLatest(TEST2_REQUEST, getTest2Saga);
}

//리듀서
const test = handleActions(
  {
    [TEST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      done: data,
    }),
    [TEST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),
  },
  initialState,
);

export default test;
