import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { takeLatest, throttle } from 'redux-saga/effects';
import createFakeRequestSaga, { createRequestActionTypes, createRequestSaga } from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/post';

const LOAD_POSTS_INIT = 'LOAD_POSTS_INIT';
const [LOAD_RECENT_POSTS_REQUEST, LOAD_RECENT_POSTS_SUCCESS, LOAD_RECENT_POSTS_FAILURE] = createRequestActionTypes('LOAD_RECENT_POSTS');
const [LOAD_TREND_POSTS_REQUEST, LOAD_TREND_POSTS_SUCCESS, LOAD_TREND_POSTS_FAILURE] = createRequestActionTypes('LOAD_TREND_POSTS');
const [LOAD_SEARCH_POSTS_REQUEST, LOAD_SEARCH_POSTS_SUCCESS, LOAD_SEARCH_POSTS_FAILURE] = createRequestActionTypes('LOAD_SEARCH_POSTS');
const [ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE] = createRequestActionTypes('ADD_POST');
const [GET_POST_REQUEST, GET_POST_SUCCESS, GET_POST_FAILURE] = createRequestActionTypes('GET_POST');
const [LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE] = createRequestActionTypes('LIKE_POST');
const [LIKE_DELETE_REQUEST, LIKE_DELETE_SUCCESS, LIKE_DELETE_FAILURE] = createRequestActionTypes('LIKE_DELETE');

export const loadPostsInitAction = createAction(LOAD_POSTS_INIT);
export const loadRecentPostsAction = createAction(LOAD_RECENT_POSTS_REQUEST, (data) => data);
export const loadTrendPostsAction = createAction(LOAD_TREND_POSTS_REQUEST, (data) => data);
export const loadSearchPostsAction = createAction(LOAD_SEARCH_POSTS_REQUEST, ({ page, keyword }) => ({ page, keyword }));
export const addPostAction = createAction(ADD_POST_REQUEST, (data) => data);
export const getPostAction = createAction(GET_POST_REQUEST, ({ userId, postId }) => ({ userId, postId }));
export const likePostAction = createAction(LIKE_POST_REQUEST, (data) => data);
export const likeDeleteAction = createAction(LIKE_DELETE_REQUEST, (data) => data);

//const loadPostsSaga = createFakeRequestSaga(LOAD_POSTS_REQUEST, '');
const loadRecentPostsSaga = createRequestSaga(LOAD_RECENT_POSTS_REQUEST, postAPI.recentList);
const loadTrendPostsSaga = createRequestSaga(LOAD_TREND_POSTS_REQUEST, postAPI.trendList);
const loadSearchPostsSaga = createRequestSaga(LOAD_SEARCH_POSTS_REQUEST, postAPI.searchList);
const addPostSaga = createRequestSaga(ADD_POST_REQUEST, postAPI.post);
const getPostSaga = createRequestSaga(GET_POST_REQUEST, postAPI.detail);
const likePostSaga = createRequestSaga(LIKE_POST_REQUEST, postAPI.like);
const likeDeleteSaga = createRequestSaga(LIKE_DELETE_REQUEST, postAPI.unlike);

export function* postSaga() {
  //이벤트 리스너!
  yield throttle(3000, LOAD_RECENT_POSTS_REQUEST, loadRecentPostsSaga);
  yield throttle(3000, LOAD_TREND_POSTS_REQUEST, loadTrendPostsSaga);
  yield throttle(3000, LOAD_SEARCH_POSTS_REQUEST, loadSearchPostsSaga);
  yield takeLatest(ADD_POST_REQUEST, addPostSaga);
  yield takeLatest(GET_POST_REQUEST, getPostSaga);
  yield takeLatest(LIKE_POST_REQUEST, likePostSaga);
  yield takeLatest(LIKE_DELETE_REQUEST, likeDeleteSaga);
}

const initialState = {
  //최신 순으로 게시글 리스트 가져오기
  loadRecentPostsDone: false,
  loadRecentPostsError: null,

  //좋아요순으로 게시글 리스트 가져오기
  loadTrendPostsDone: false,
  loadTrendPostsError: null,

  //검색 키워드순으로 게시글 리스트 가져오기
  loadSearchPostsDone: false,
  loadSearchPostsError: null,

  //게시글 작성
  addPostDone: false,
  addPostError: null,
  addPostId: null,

  //게시글 상세보기
  getPostDone: false,
  getPostError: null,

  //게시글 좋아요
  likePostDone: false,
  likePostError: null,

  //게시글 싫어요
  likeDeleteDone: false,
  likeDeleteError: null,

  //page: 0, //10개 단위,
  post: null,
  hasMorePosts: true,
  cmRespDto: null,
  error: null,
  trendPosts: [],
  recentPosts: [],
  searchPosts: [],
};

const post = handleActions(
  {
    //모든 posts 초기화
    [LOAD_POSTS_INIT]: (state) => ({
      ...state,
      trendPosts: [],
      recentPosts: [],
      searchPosts: [],
    }),
    //홈 페이지 게시글 리스트 불러오기(트렌딩)
    [LOAD_TREND_POSTS_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.loadTrendPostsDone = false;
        draft.loadTrendPostsError = null;
      }),
    [LOAD_TREND_POSTS_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      loadTrendPostsError: null,
      loadTrendPostsDone: true,
      trendPosts: state.trendPosts.concat(data.data.content),
      cmRespDto: data,
      hasMorePosts: !data.data.last,
    }),
    [LOAD_TREND_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadTrendPostssError: error,
    }),

    //최신 게시글 순 불러오기
    [LOAD_RECENT_POSTS_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.loadRecentPostsDone = false;
        draft.loadRecentPostsError = null;
      }),
    [LOAD_RECENT_POSTS_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      loadRecentPostsError: null,
      loadRecentPostsDone: true,
      recentPosts: state.recentPosts.concat(data.data.content),
      cmRespDto: data,
      hasMorePosts: !data.data.last,
    }),
    [LOAD_RECENT_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadRecentPostssError: error,
    }),

    //검색 게시글 리스트
    [LOAD_SEARCH_POSTS_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.loadSearchPostsDone = false;
        draft.loadSearchPostsError = null;
      }),
    [LOAD_SEARCH_POSTS_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      loadSearchPostsError: null,
      loadSearchPostsDone: true,
      searchPosts: state.searchPosts.concat(data.data.content),
      cmRespDto: data,
      hasMorePosts: !data.data.last,
    }),
    [LOAD_SEARCH_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadSearchPostsError: error,
    }),

    //게시글 작성
    [ADD_POST_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.addPostDone = false;
        draft.addPostError = null;
      }),
    [ADD_POST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      addPostError: null,
      addPostDone: true,
      cmRespDto: data,
      addPostId: data.data,
    }),
    [ADD_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      addPostError: error,
    }),

    //게시글 상세보기
    [GET_POST_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.getPostDone = false;
        draft.getPostError = null;
      }),
    [GET_POST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      getPostError: null,
      getPostDone: true,
      cmRespDto: data,
      post: data.data,
    }),
    [GET_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      getPostError: error,
    }),

    //게시글 좋아요
    [LIKE_POST_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.likePostDone = false;
        draft.likePostError = null;
      }),
    [LIKE_POST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      likePostError: null,
      likePostDone: true,
      cmRespDto: data,
    }),
    [LIKE_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      likePostError: error,
    }),

    //게시글 싫어요
    [LIKE_DELETE_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.likeDeleteDone = false;
        draft.likeDeleteError = null;
      }),
    [LIKE_DELETE_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      likeDeleteError: null,
      likeDeleteDone: true,
      cmRespDto: data,
    }),
    [LIKE_DELETE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      likeDeleteError: error,
    }),
  },
  initialState,
);

export default post;
