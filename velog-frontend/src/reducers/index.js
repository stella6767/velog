import { all } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import comment, { commentSaga } from './comment';
import loading from './loading';
import post, { postSaga } from './post';
import test, { testSaga } from './test';
import user, { userSaga } from './user';
const rootReducer = combineReducers({
  auth,
  loading,
  test,
  post,
  user,
  comment,
});

export function* rootSaga() {
  yield all([authSaga(), testSaga(), postSaga(), userSaga(), commentSaga()]);
}

export default rootReducer;
