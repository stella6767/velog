import React, { memo } from 'react';
import AppHeader from '../../components/AppHeader';
import { StyledPostDetailContainer, Global, StyledHeadDescDiv, StyledDetailContentDiv, StyledDetailCommentDiv } from '../user/style';
import { Link } from 'react-router-dom';
import CommentForm from '../../components/CommentForm';
import CommentCard from '../../components/CommentCard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPostAction, likePostAction } from '../../reducers/post';
import { useSelector } from 'react-redux';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useCallback } from 'react';
import useUpdateEffect from '../../lib/hooks/useUpdateEffect';
import { useState } from 'react';
import PostDetailHeader from '../../components/PostDetailHeader';
import PostDetailComment from '../../components/PostDetailComment';

const PostDetail = memo((props) => {
  const { post, getPostDone, likePostDone, likePostError, likeDeleteDone, likeDeleteError } = useSelector(({ post, loading }) => ({
    post: post.post,
    getPostDone: post.getPostDone,
    likePostDone: post.likePostDone,
    likePostError: post.likePostError,
    likeDeleteDone: post.likeDeleteDone,
    likeDeleteError: post.likeDeleteError,
  }));

  const dispatch = useDispatch();

  // const [likeState, setLikeState] = useState(post.likeState || false); // useState(post.likeState);
  // const [likeCount, setLikeCount] = useState(post.likeCount || 0);

  useEffect(() => {
    // console.log('props', props);
    // console.log('postId', props.match.params.postId);
    // console.log('userId', props.match.params.userId);
    const postId = props.match.params.postId;
    const userId = props.match.params.userId;
    dispatch(getPostAction({ userId, postId }));
  }, []);

  return (
    <>
      {post && (
        <>
          <Global />
          <AppHeader />
          <StyledPostDetailContainer>
            <PostDetailHeader
              post={post}
              likePostDone={likePostDone}
              likePostError={likePostError}
              likeDeleteDone={likeDeleteDone}
              likeDeleteError={likeDeleteError}
              userId={props.match.params.userId}
              postId={props.match.params.postId}
            />
            {post.content && <StyledDetailContentDiv dangerouslySetInnerHTML={{ __html: post.content }} />}
            <PostDetailComment post={post} userId={props.match.params.userId} postId={props.match.params.postId} />
          </StyledPostDetailContainer>
        </>
      )}
    </>
  );
});

export default PostDetail;
