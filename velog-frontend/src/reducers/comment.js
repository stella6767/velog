import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { takeLatest, throttle } from 'redux-saga/effects';
import createFakeRequestSaga, { createRequestActionTypes, createRequestSaga } from '../lib/createRequestSaga';
import * as commentAPI from '../lib/api/comment';

const [COMMENT_POST_REQUEST, COMMENT_POST_SUCCESS, COMMENT_POST_FAILURE] = createRequestActionTypes('COMMENT_POST');
const [RECOMMENT_POST_REQUEST, RECOMMENT_POST_SUCCESS, RECOMMENT_POST_FAILURE] = createRequestActionTypes('RECOMMENT_POST');

export const commentPostsAction = createAction(COMMENT_POST_REQUEST, ({ content, postId }) => ({ content, postId }));
export const recommentPostsAction = createAction(RECOMMENT_POST_REQUEST, ({ commentId, content }) => ({ commentId, content }));

const commentPostsSaga = createRequestSaga(COMMENT_POST_REQUEST, commentAPI.save);
const recommentPostsSaga = createRequestSaga(RECOMMENT_POST_REQUEST, commentAPI.recommentSave);

export function* commentSaga() {
  //이벤트 리스너!
  yield takeLatest(COMMENT_POST_REQUEST, commentPostsSaga);
  yield takeLatest(RECOMMENT_POST_REQUEST, recommentPostsSaga);
}

const initialState = {
  //게시글 작성
  commentPostDone: false,
  commentPostError: null,

  recommentPostDone: false,
  recommentPostError: null,

  comment: null,
  cmRespDto: null,
  error: null,
};

const comment = handleActions(
  {
    //댓글쓰기
    [COMMENT_POST_REQUEST]: (state) =>
      produce(state, (draft) => {
        draft.commentPostDone = false;
        draft.commentPostError = null;
      }),
    [COMMENT_POST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      commentPostError: null,
      commentPostDone: true,
      cmRespDto: data,
      comment: data.data,
    }),
    [COMMENT_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      commentPostError: error,
    }),
    //대댓글 작성
    [RECOMMENT_POST_REQUEST]: (state) =>
      produce(state, (draft) => {
        draft.recommentPostDone = false;
        draft.recommentPostError = null;
      }),
    [RECOMMENT_POST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      recommentPostError: null,
      recommentPostDone: true,
      cmRespDto: data,
      //comment: data.data,
    }),
    [RECOMMENT_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      recommentPostError: error,
    }),
  },
  initialState,
);

export default comment;
