import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { loadPostsInitAction, loadTrendPostsAction } from '../../reducers/post';
import { StyledMainDiv } from './style';

//트렌딩 페이지
const Home = () => {
  const [isHome] = useState(true);
  const [page, setPage] = useState(0);

  const { trendPosts, hasMorePosts, loadPostLoading, loadTrendPostsDone } = useSelector(({ post, loading }) => ({
    trendPosts: post.trendPosts,
    hasMorePosts: post.hasMorePosts,
    loadPostLoading: loading['LOAD_TREND_POSTS_REQUEST'],
    loadTrendPostsDone: post.loadTrendPostsDone,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(loadUserAction()); App.js에서 해야되나..

    dispatch(loadPostsInitAction());
    setPage(0);
    dispatch(loadTrendPostsAction(page));
  }, []);

  useEffect(() => {
    if (loadTrendPostsDone) {
      setPage(page + 1);
    }
  }, [loadTrendPostsDone]);

  useEffect(() => {
    console.log(trendPosts);

    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostLoading && loadTrendPostsDone) {
          //console.log('요청함', loadPostLoading);
          //console.log('이게 될까?', page);
          dispatch(loadTrendPostsAction(page));
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [trendPosts, hasMorePosts, loadPostLoading, loadTrendPostsDone, dispatch, page]);

  return (
    <>
      <AppLayout isHome={isHome}>
        {trendPosts.length != 1 && (
          <StyledMainDiv>
            {trendPosts.map((post) => (
              <PostCard key={post.id} post={post} loading={loadPostLoading} />
            ))}
          </StyledMainDiv>
        )}
      </AppLayout>
    </>
  );
};

export default Home;
