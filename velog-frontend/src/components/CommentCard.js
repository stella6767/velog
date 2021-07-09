import React, { memo } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { useState } from 'react';
import { createElement } from 'react';
import { Link } from 'react-router-dom';
import RecommentForm from './RecommentForm';
import { useRef } from 'react';

// const StyledRecommentFrom

const CommentCard = memo((props) => {
  const { comment, userId, postId } = props;

  //const actions = [<span key="comment-basic-reply-to">Reply to</span>];  계층형 댓글은 시간날때

  //const commentRef = useRef(null);

  const [showRecomment, setShowRecomment] = useState(false);

  const onReplyClick = () => {
    setShowRecomment(!showRecomment);
  };

  const recomment = <div>adasddas</div>;

  return (
    <>
      <Comment
        actions={[
          <span key="comment-nested-reply-to" onClick={onReplyClick}>
            답글
          </span>,
        ]}
        author={<Link to={`/${userId}`}>{comment.user.username}</Link>}
        // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
        content={<p dangerouslySetInnerHTML={{ __html: comment.content }} />}
        style={{ paddingBottom: '3rem' }}
        datetime={
          <Tooltip title={moment(comment.createDate).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      >
        {showRecomment && <RecommentForm commentId={comment.id} />}
        {props.children}
      </Comment>
      {/* 
      <div className="recomment-form">
        <RecommentForm />
      </div> */}
    </>
  );
});

export default CommentCard;
