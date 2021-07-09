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

const RecommentCard = memo((props) => {
  const { recomment } = props;

  //const actions = [<span key="comment-basic-reply-to">Reply to</span>];  계층형 댓글은 시간날때

  //const commentRef = useRef(null);

  const [showRecomment, setShowRecomment] = useState(false);

  const onReplyClick = () => {
    setShowRecomment(!showRecomment);
  };

  // const RenderRecomment = (parentId) =>
  //   Comments.map((comment, index) => (
  //     <>
  //       {comment.responseTo === parentId && (
  //         <div style={{ width: "80%", marginLeft: "40px" }}>
  //           <SingleComment
  //             key={index}
  //             post_id={post_id}
  //             comment={comment}
  //             userData={userData}
  //             Comments={Comments}
  //             setComments={setComments}
  //           />
  //           <ReplayComment
  //             key={index}
  //             post_id={post_id}
  //             comment={comment}
  //             userData={userData}
  //             Comments={Comments}
  //             setComments={setComments}
  //           />
  //         </div>
  //       )}
  //     </>
  //   ));

  return (
    <>
      {recomment && (
        <Comment
          actions={
            [
              // <span key="comment-nested-reply-to" onClick={onReplyClick}>
              //   답글
              // </span>,
            ]
          }
          author={<Link to={`/${recomment.user.id}`}>{recomment.user.username}</Link>}
          // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
          content={<p dangerouslySetInnerHTML={{ __html: recomment.content }} />}
          style={{ paddingBottom: '3rem' }}
          datetime={
            <Tooltip title={moment(recomment.createDate).format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        >
          {/* {recomment} */}
        </Comment>
      )}

      {/* {showRecomment && <RecommentForm />} */}
    </>
  );
});

export default RecommentCard;
