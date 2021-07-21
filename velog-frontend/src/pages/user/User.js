import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import PostBox from '../../components/PostBox';
import { userAction } from '../../reducers/user';
import {
  Global,
  StyledUserContainerDiv,
  StyledUserDescDiv,
  StyledUserProfileImg,
  StyledUserTopDiv,
  StyledUserVelogDiv,
} from './style';

//이 페이지 인피니트 스크롤링은 나중에 구현하자.
const User = memo((props) => {
  const { posts, userData, userDone } = useSelector(({ user, loading }) => ({
    userData: user.userData,
    //userLoading: loading['USER_REQUEST'],
    userDone: user.userDone,
    posts: user.posts,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    //console.log('userData: ', userData);
  }, [userData]);

  useEffect(() => {
    //console.log('유저데이터 한번 받아옴 10개 기준, 일단은 다 받아오자..');
    //console.log('url parame', props.match.params.userId);
    dispatch(userAction(props.match.params.userId));
  }, [dispatch, props.match.params.userId]);

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
                <div className="name">{userData.user.username}</div>
                <div className="description">개발자 지망생~~ 이 사이트는 velog를 모방하였습니다.</div>
              </StyledUserDescDiv>
            </StyledUserTopDiv>
            <div className="line-height-div" />
            <div className="social-div"></div>
          </StyledUserVelogDiv>

          {/* map함수 괄호 잘못 적어서 2시간 삽질했네!!!!!!!!!!!  */}

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
