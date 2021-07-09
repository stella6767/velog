import React, { memo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { loadPostsInitAction, loadRecentPostsAction } from '../../reducers/post';
import { StyledMainDiv } from '../home/style';

//최신 페이지
const Recent = memo((props) => {
  const [isHome] = useState(true); //같이 쓰자. 헷갈릴 순 있지만.
  const [page, setPage] = useState(0);

  const { recentPosts, hasMorePosts, loadPostLoading, loadRecentPostsDone } = useSelector(({ post, loading }) => ({
    recentPosts: post.recentPosts,
    hasMorePosts: post.hasMorePosts,
    loadPostLoading: loading['LOAD_RECENT_POSTS_REQUEST'],
    loadRecentPostsDone: post.loadRecentPostsDone,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(loadUserAction());
    dispatch(loadPostsInitAction());
    setPage(0);
    console.log('왜 바로바로 실행이 안되지..');
    dispatch(loadRecentPostsAction(page));
  }, []);

  useEffect(() => {
    if (loadRecentPostsDone) {
      setPage(page + 1);
    }
  }, [loadRecentPostsDone]);

  useEffect(() => {
    console.log(recentPosts);

    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostLoading && loadRecentPostsDone) {
          //console.log('요청함', loadPostLoading);
          //console.log('이게 될까?', page);
          dispatch(loadRecentPostsAction(page));
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [recentPosts, hasMorePosts, loadPostLoading, loadRecentPostsDone, dispatch, page]);

  return (
    <>
      <AppLayout isHome={isHome}>
        {recentPosts.length != 1 && (
          <StyledMainDiv>
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} loading={loadPostLoading} />
            ))}
          </StyledMainDiv>
        )}
      </AppLayout>
    </>
  );
});

export default Recent;
