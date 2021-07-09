import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { Global, StyledPostCardDateDiv, StyledPostCardFootDiv } from './style';
import { Link } from 'react-router-dom';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import moment from 'moment';

// const StyledDefaultImg = styled.img`
//   background-image: url(/images/search.svg);
// `;
//dangerouslySetInnerHTML={{ __html: post.content }}
const PostCard = (props) => {
  const { post, loading } = props;

  return (
    <>
      <Global />
      <Card cover={post.thumbnail != null ? <img alt="example" src={post.thumbnail} /> : null} loading={loading}>
        {/* <Card cover={<img alt="" src={`${post.thumnail}`} />}> */}
        <Link to={`/${post.user.id}/${post.id}`}>
          <Card.Meta title={post.title} description={<div dangerouslySetInnerHTML={{ __html: post.content }} />} />
        </Link>
        <StyledPostCardDateDiv>
          <span>{moment(post.createDate).format('YYYY년 MM월 DD일')}</span>
          <span className="separator">·</span>
          <span>{post.comments.length}개의 댓글</span>
        </StyledPostCardDateDiv>
        <StyledPostCardFootDiv>
          <Link to={`/${post.user.id}`} className="userinfo" href="/@eungyeole">
            <span>
              by <b>{post.user.username}</b>
            </span>
          </Link>
          <div className="likes">
            {post.likeState ? <HeartFilled /> : <HeartOutlined />}
            <span style={{ marginLeft: '0.5rem' }}>{post.likeCount}</span>
          </div>
        </StyledPostCardFootDiv>
      </Card>
    </>
  );
};

PostCard.propTypes = {};

export default PostCard;
