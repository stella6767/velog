import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PostBox from '../../components/PostBox';
import SearchLayout from '../../components/SearchLayout';
import { loadPostsInitAction, loadSearchPostsAction } from '../../reducers/post';
import './style.css';

const StyledSearchDiv = styled.div`
  display: flex;
  height: 4rem;
  position: relative;
  border: solid 1px black;

  .search-Input {
    padding-left: 3rem;
  }

  input::placeholder {
    opacity: 1;
    font-size: 1.3rem;
  }
`;

const StyledSearchContainerDiv = styled.div`
  /* padding: 2rem; */
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 2rem;
  width: 768px;
  margin-left: auto;
  margin-right: auto;
`;

const Search = (props) => {
  const { searchPosts, loading, loadSearchPostsDone, loadSearchPostsError, hasMorePosts } = useSelector(({ post, loading }) => ({
    searchPosts: post.searchPosts,
    loading: loading['LOAD_SEARCH_POSTS_REQUEST'],
    loadSearchPostsDone: post.loadSearchPostsDone,
    loadSearchPostsError: post.loadSearchPostsError,
    hasMorePosts: post.hasMorePosts,
  }));

  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setPage(0);
  }, []);

  useEffect(() => {
    console.log(searchPosts);

    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loading && loadSearchPostsDone) {
          //console.log('요청함', loadPostLoading);
          //console.log('이게 될까?', page);
          dispatch(loadSearchPostsAction({ page, keyword }));
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [searchPosts, hasMorePosts, loading, loadSearchPostsDone, dispatch, page]);

  useEffect(() => {
    if (loadSearchPostsDone) {
      setPage(page + 1);
    }
  }, [loadSearchPostsDone]);

  const onClick = (keyword) => {
    console.log('enter 누름', keyword);
    dispatch(loadPostsInitAction());
    dispatch(loadSearchPostsAction({ page, keyword }));
  };

  const onKeyPress = (e) => {
    //e.preventDefault();
    //console.log('e', e);
    if (e.key == 'Enter') {
      onClick(keyword);
    }
  };

  const handleInput = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    //computed property names 문법(키 값 동적할당)
    setKeyword(e.target.value);
  };

  return (
    <>
      <SearchLayout />
      <StyledSearchContainerDiv>
        <StyledSearchDiv>
          <SearchOutlined style={{ position: 'absolute', fontSize: '2rem', left: '10px', zIndex: '1', top: '1rem' }} />
          <Input
            placeholder="검색어를 입력하세요."
            className="search-Input"
            onKeyPress={onKeyPress}
            value={keyword}
            onChange={handleInput}
            name="keyword"
          />
        </StyledSearchDiv>
        {searchPosts != null ? searchPosts.map((post) => <PostBox key={post.id} post={post} userId={post.user.id} />) : null}
      </StyledSearchContainerDiv>
    </>
  );
};

export default Search;
