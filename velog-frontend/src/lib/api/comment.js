import client from './client';

export const save = ({ content, postId }) => {
  console.log('content', content, 'postId', postId);

  return client.post(`/comment/${postId}`, JSON.stringify(content));
};

export const recommentSave = ({ commentId, content }) => {
  console.log('commentId', commentId, 'content', content);
  //아아아앙아아아앙아!!!!!!! return을 안 해줬구나!!!!!!!
  return client.post(`/comment/recomment/${commentId}`, JSON.stringify(content));
};
