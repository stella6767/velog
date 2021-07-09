import React, { memo } from 'react';
import { useRef } from 'react';
import { createRef } from 'react';
import { useState } from 'react';
import { StyledDetailCommentDiv } from '../pages/user/style';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import RecommentCard from './RecommentCard';
import RecommentForm from './RecommentForm';

//댓글박스
const PostDetailComment = memo((props) => {
  const { post, userId, postId } = props;

  const [commentLength, setCommentLength] = useState(post.comments.length);
  const [comments, setComments] = useState(post.comments);

  const commentRefs = Array.from({ length: comments.length }).map(() => createRef()); //배열 동적 타겟.

  return (
    <>
      <StyledDetailCommentDiv>
        <h3>{commentLength}개의 댓글</h3>
        <CommentForm
          postId={post.id}
          setCommentLength={setCommentLength}
          commentLength={commentLength}
          setComments={setComments}
          comments={comments}
        />
        {comments.map((comment, index) =>
          comment.recomments != null ? (
            <CommentCard key={comment.id} comment={comment} userId={userId} postId={postId} ref={commentRefs[index]}>
              {/* <div>대댓글</div> */}
              {comment.recomments.map((recomment) => (
                <RecommentCard key={recomment.id} recomment={recomment} />
              ))}
            </CommentCard>
          ) : (
            <CommentCard key={comment.id} comment={comment} userId={userId} postId={postId} ref={commentRefs[index]} />
          ),
        )}
      </StyledDetailCommentDiv>
    </>
  );
});

export default PostDetailComment;
