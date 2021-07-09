import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { takeLatest, throttle } from 'redux-saga/effects';
import createFakeRequestSaga, { createRequestActionTypes, createRequestSaga } from '../lib/createRequestSaga';
import * as userAPI from '../lib/api/user';

const USER_POSTS_INIT = 'USER_POSTS_INIT';
const [USER_REQUEST, USER_SUCCESS, USER_FAILURE] = createRequestActionTypes('USER');
const [LOAD_USER_POSTS_REQUEST, LOAD_USER_POSTS_SUCCESS, LOAD_USER_POSTS_FAILURE] = createRequestActionTypes('LOAD_USER_POSTS'); //likedPost 불러오기

export const userPostsInitAction = createAction(USER_POSTS_INIT);
export const userAction = createAction(USER_REQUEST, (urlParam) => urlParam);
export const loadUserPostAction = createAction(LOAD_USER_POSTS_REQUEST);

const userReqSaga = createRequestSaga(USER_REQUEST, userAPI.user);
const loadUserPostSaga = createRequestSaga(LOAD_USER_POSTS_REQUEST, userAPI.likelist);

export function* userSaga() {
  //이벤트 리스너!
  yield takeLatest(USER_REQUEST, userReqSaga);
  yield throttle(3000, LOAD_USER_POSTS_REQUEST, loadUserPostSaga);
}

const initialState = {
  //유저 정보(회원벨로그) 가져오기 principal 하고 구분!
  userDone: false,
  userError: null,
  userData: null,

  //유저가 좋아요 한 게시글 목록 불러오기
  loadUserPostDone: false,
  loadUserPostError: null,

  likedPosts: [],
  userTags: [], //배열로 안 받으면 배열로 자동 변환안 되는 것 같은디??
  user: null,
  posts: [],
  cmRespDto: null,
  error: null,
  hasMorePosts: true,
};

const user = handleActions(
  {
    [USER_POSTS_INIT]: (state) => ({
      ...state,
      likedPosts: [],
    }),
    //게시글 작성
    [USER_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.userDone = false;
        draft.userError = null;
      }),
    [USER_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      userError: null,
      userDone: true,
      cmRespDto: data,
      userData: data.data,
      userTags: data.data.tags,
      posts: data.data.user.posts,
    }),
    [USER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      userError: error,
    }),

    //읽기목록
    [LOAD_USER_POSTS_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.loadUserPostDone = false;
        draft.loadUserPostError = null;
      }),
    [LOAD_USER_POSTS_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      loadUserPostError: null,
      loadUserPostDone: true,
      cmRespDto: data,
      likedPosts: state.likedPosts.concat(data.data.content),
      hasMorePosts: !data.data.last,
    }),
    [LOAD_USER_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadUserPostError: error,
    }),
  },
  initialState,
);

export default user;
