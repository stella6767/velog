import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { loadUserPostAction, userPostsInitAction } from '../../reducers/user';
import { StyledMainDiv } from '../home/style';

const LikeList = memo((props) => {
  const [page, setPage] = useState(0);

  const { likedPosts, hasMorePosts, loading, loadUserPostDone, loadUserPostError } = useSelector(({ loading, user }) => ({
    likedPosts: user.likedPosts,
    hasMorePosts: user.hasMorePosts,
    loading: loading['LOAD_USER_POSTS_REQUEST'],
    loadUserPostDone: user.loadUserPostDone,
    loadUserPostError: user.loadUserPostError,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(loadUserAction()); App.js에서 해야되나..
    dispatch(userPostsInitAction());
    setPage(0);
    dispatch(loadUserPostAction(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (loadUserPostDone) {
      setPage(page + 1);
    }

    if (loadUserPostError != null) {
      alert('무언가 오류');
    }
  }, [loadUserPostDone, loadUserPostError, page]);

  useEffect(() => {
    //console.log(likedPosts);

    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loading && loadUserPostDone) {
          //console.log('요청함', loadPostLoading);
          //console.log('이게 될까?', page);
          dispatch(loadUserPostAction(page));
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [likedPosts, hasMorePosts, loading, loadUserPostDone, dispatch, page]);

  return (
    <>
      <AppLayout>
        {likedPosts.length != 1 && (
          <StyledMainDiv>
            {likedPosts.map((post) => (
              <PostCard key={post.id} post={post} loading={loading} />
            ))}
          </StyledMainDiv>
        )}
      </AppLayout>
    </>
  );
});

export default LikeList;
