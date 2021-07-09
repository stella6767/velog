import { Button, Comment, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useUpdateEffect from '../lib/hooks/useUpdateEffect';
import comment, { commentPostsAction, recommentPostsAction } from '../reducers/comment';
import { StyledCommentForm } from './style';

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, loading, value }) => (
  <StyledCommentForm>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} placeholder="댓글을 작성하세요" />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={loading} onClick={onSubmit}>
        답글 쓰기
      </Button>
    </Form.Item>
  </StyledCommentForm>
);

const RecommentForm = (props) => {
  const { commentId } = props;

  const { recommentLoading, recommentPostDone, comment, recommentPostError } = useSelector(({ loading, comment }) => ({
    recommentLoading: loading['RECOMMENT_POST_REQUEST'],
    recommentPostDone: comment.recommentPostDone,
    recommentPostError: comment.recommentPostError,
    //comment: comment.comment,
  }));
  const dispatch = useDispatch();

  const [value, setValue] = useState('');

  useUpdateEffect(() => {
    if (recommentPostDone) {
      setValue('');

      console.log('성공', comment);
    }

    if (recommentPostError) {
      alert('답글 달기에 실패하였습니다.');
    }
  }, [recommentPostDone, recommentPostError]);

  const handleSubmit = (e) => {
    if (!value) {
      return;
    }
    console.log(value);

    const content = value;
    dispatch(recommentPostsAction({ commentId, content }));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Comment content={<Editor onChange={handleChange} onSubmit={handleSubmit} value={value} loading={recommentLoading} />} />
    </>
  );
};

export default RecommentForm;
