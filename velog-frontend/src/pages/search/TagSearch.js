import React, { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchLayout from '../../components/SearchLayout';
import { StyledSearchContainerDiv, StyledTagSearchedDiv } from './style';
import qs from 'qs';
import { useDispatch } from 'react-redux';
import { tagAction } from '../../reducers/tag';
import { useSelector } from 'react-redux';
import PostBox from '../../components/PostBox';
import useUpdateEffect from '../../lib/hooks/useUpdateEffect';

const TagSearch = memo(() => {
  let location = useLocation();

  const { data, tagSearchError } = useSelector(({ tag }) => ({
    data: tag.data,
    tagSearchError: tag.tagSearchError,
  }));

  const dispatch = useDispatch();

  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true, // 이 설정을 통하여 문자열 맨 앞의 ? 를 생략합니다.
  });

  useEffect(() => {
    //console.log('쿼리 파싱 결과', query);

    dispatch(tagAction(query.name));
  }, [dispatch, query.name]);

  useUpdateEffect(() => {
    if (tagSearchError) {
      alert('태그 관련 게시글 불러오기 실패하였습니다.');
    }
  }, [tagSearchError]);

  return (
    <>
      <SearchLayout />
      <StyledSearchContainerDiv>
        <StyledTagSearchedDiv>{query && <h1>#{query.name}</h1>}</StyledTagSearchedDiv>
        {data && data.map((post) => <PostBox key={post.id} post={post} userId={post.user.id} />)}
      </StyledSearchContainerDiv>
    </>
  );
});

export default TagSearch;
