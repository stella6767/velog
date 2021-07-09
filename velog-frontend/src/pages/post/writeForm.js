import React, { memo } from 'react';
import { useState } from 'react';
import TextEditor from '../../components/TextEditor';
import styled from 'styled-components';
import { Global, StyledButtonDiv } from './style';
import { Input, Form, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addPostAction } from '../../reducers/post';
import useUpdateEffect from '../../lib/hooks/useUpdateEffect';
import { useSelector } from 'react-redux';

const StyledPostDiv = styled.div`
  padding: 2rem;
`;

const writeForm = memo((props) => {
  const { addPostDone, principal, postId } = useSelector(({ post, auth }) => ({
    addPostDone: post.addPostDone,
    principal: auth.principal,
    postId: post.addPostId,
  }));

  const [value, setvalue] = useState('');
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  useUpdateEffect(() => {
    if (addPostDone) {
      //history go postdetail
      console.log('저장하기 성공');
      props.history.replace(`/${principal.id}/${postId}`);
    }
  }, [addPostDone, postId]);

  const onPostFinish = (values) => {
    console.log('post 제출함', values);
    dispatch(addPostAction(values));
  };

  // const exitForm = useCallback(() =>{
  // },[]);

  const exitForm = () => {
    console.log('props', props);
    console.log('history객체', props.history);
    console.log('match 객체', props.match);
    console.log('location 객체', props.location);

    props.history.goBack();
  };

  return (
    <>
      <StyledPostDiv>
        <Global />

        <Form form={form} onFinish={onPostFinish}>
          {/* <input type="text" className="form-control" placeholder="제목을 입력하세요" name="title" /> */}
          <div className="titleDiv">
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="제목을 입력하세요" />
            </Form.Item>
          </div>
          <Form.Item name="tags">
            <Input placeholder="#태그" />
          </Form.Item>
          <Form.Item name="content">
            <TextEditor name="content" value={value} onChange={(value) => setvalue(value)} name="content" />
          </Form.Item>
          <Form.Item>
            <StyledButtonDiv>
              <Button onClick={exitForm}>뒤로가기</Button>
              <Button type="primary" htmlType="submit">
                출간하기
              </Button>
            </StyledButtonDiv>
          </Form.Item>
        </Form>
      </StyledPostDiv>
    </>
  );
});

export default writeForm;
