import client from './client';

//게시글 작성
export const post = (data) => client.post('/post', JSON.stringify(data));

//게시글 상세보기
export const detail = ({ userId, postId }) => {
  //console.log('이게 되냐?', userId, postId);
  return client.get(`/post/${userId}/${postId}`);
};

//최신순으로 게시글리스트
export const recentList = (page) => {
  console.log('page: ', page);
  return client.get(`/post/all?page=${page}`);
};

//좋아요 있는 게시글 중 좋아요 많은 순대로
export const trendList = (page) => {
  console.log('page: ', page);
  return client.get(`/post/trend?page=${page}`);
};

//검색 게시글 리스트
export const searchList = ({ page, keyword }) => {
  console.log('page: ', page);
  return client.get(`/post/search?page=${page}&keyword=${keyword}`);
};

//게시글 좋아요
export const like = (postId) => client.post(`/post/${postId}/likes`);

//게시글 싫어요(좋아요 해제)
export const unlike = (postId) => client.delete(`/post/${postId}/likes`);

//quil editor 이미지 업로드용도
export const imgUpload = (data) => client.post('/post/2/thumbnail', JSON.stringify(data), { headers });

const headers = {
  post: {
    'Content-Type': '',
  },
  data: 'data',
  encType: 'multipart/form-data', //필수 아님, 파일을 넣을거면 필수(e)
  dataType: 'json',
  processData: false,
};
