import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import PostBox from '../../components/PostBox';
import { StyledTagUl } from '../../components/style';
import TagUserBtn from '../../components/TagUserBtn';
import { userAction } from '../../reducers/user';
import { Global, StyledUserContainerDiv, StyledUserDescDiv, StyledUserProfileImg, StyledUserTopDiv, StyledUserVelogDiv } from './style';

//이 페이지 인피니트 스크롤링은 나중에 구현하자.
const User = memo((props) => {
  const { posts, userData, userLoading, userDone } = useSelector(({ user, loading }) => ({
    userData: user.userData,
    userLoading: loading['USER_REQUEST'],
    userDone: user.userDone,
    posts: user.posts,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('userData: ', userData);
  }, [userData]);

  useEffect(() => {
    //console.log('유저데이터 한번 받아옴 10개 기준, 일단은 다 받아오자..');
    console.log('url parame', props.match.params.userId);
    dispatch(userAction(props.match.params.userId));
  }, []);

  // const postCount = userData.postCount;

  return (
    <>
      <AppLayout />
      <Global />
      {userDone && (
        <StyledUserContainerDiv>
          <StyledUserVelogDiv>
            <StyledUserTopDiv>
              <StyledUserProfileImg />
              <StyledUserDescDiv>
                <div className="name">강민규</div>
                <div className="description">개발자 지망생~~ 여기 적는 글들은 신뢰성 0%이므로 믿지 마세요!</div>
              </StyledUserDescDiv>
            </StyledUserTopDiv>
            <div className="line-height-div" />
            <div className="social-div"></div>
          </StyledUserVelogDiv>

          {/* map함수 괄호 잘못 적어서 2시간 삽질했네!!!!!!!!!!!  */}

          <StyledTagUl>
            {userData.tags.map((tag) => (
              <TagUserBtn key={tag.id} tag={tag} />
            ))}
          </StyledTagUl>
          <div>
            {posts.map((post) => (
              <PostBox key={post.id} post={post} userId={props.match.params.userId} />
            ))}
          </div>
        </StyledUserContainerDiv>
      )}
    </>
  );
});

export default User;
