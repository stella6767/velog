import { Comment, Tooltip } from 'antd';
import moment from 'moment';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { commentDeleteAction } from '../reducers/comment';

const CommentCard = memo((props) => {
  const { comment, userId } = props;

  const { principal } = useSelector(({ auth }) => ({
    principal: auth.principal,
  }));

  const dispatch = useDispatch();

  const onDeleteClick = () => {
    //console.log('댓글 삭제', comment.id);

    dispatch(commentDeleteAction(comment.id));
  };

  return (
    <>
      <Comment
        actions={
          principal != null && principal.id === comment.user.id
            ? [
                <span key="comment-nested-reply-to" onClick={onDeleteClick}>
                  삭제
                </span>,
              ]
            : null
        }
        author={<Link to={`/${userId}`}>{comment.user.username}</Link>}
        content={<p dangerouslySetInnerHTML={{ __html: comment.content }} />}
        style={{ paddingBottom: '3rem' }}
        datetime={
          <Tooltip title={moment(comment.createDate).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      ></Comment>
    </>
  );
});

export default CommentCard;
