import { Form } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { joinAction, loginAction } from '../../reducers/auth';
import JoinModal from './JoinModal';
import LoginModal from './LoginModal';
import useUpdateEffect from '../../lib/hooks/useUpdateEffect';

const AuthModal = memo((props) => {
  const { loginLoading, joinLoading, authData } = useSelector(({ loading, auth }) => ({
    loginLoading: loading['LOGIN_REQUEST'],
    joinLoading: loading['JOIN_REQUEST'],
    authData: auth.cmRespDto,
  }));

  //함수들은 나중에 다 usecCallback로 바꿔주자..
  const { loginVisible, setLoginVisible, joinDone, joinError, data } = props;
  const [joinVisible, setJoinVisible] = useState(false);
  const [loginForm] = Form.useForm();
  const [joinForm] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  //리덕스 관련코드
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log('joinForm', joinForm);
    forceUpdate({});
  }, []);

  useUpdateEffect(() => {
    if (joinError) {
      alert('회원가입 실패');
      console.log(joinError);
      return;
    }

    if (joinDone) {
      alert(authData.msg);
      console.log(joinDone);

      if (authData.statusCode === -1) {
        setJoinVisible(true);
      } else {
        setJoinVisible(false);
      }
    }
  }, [joinDone, joinError]);

  const handleCancel = () => {
    console.log('Clicked cancel button');
    joinForm.resetFields();
    loginForm.resetFields();
    setLoginVisible(false);
    setJoinVisible(false);
  };

  const toggleModal = () => {
    setLoginVisible(!loginVisible);
    setJoinVisible(!joinVisible);
  };

  const onJoinFinish = (values) => {
    console.log(values);

    const whiteSpace = checkSpace(values.username, values.password);

    if (whiteSpace) {
      return alert('공백 금지');
    } else {
      dispatch(joinAction(values));
      joinForm.resetFields();
    }
  };

  const onLoginFinish = (values) => {
    console.log('login Finish:', values);

    const whiteSpace = checkSpace(values.username, values.password);

    if (whiteSpace) {
      return alert('공백 금지');
    } else {
      dispatch(loginAction(values));
      loginForm.resetFields();
    }
  };

  const checkSpace = (username, password) => {
    //공백체크
    //{postData.split(/(#[^\s#]+)/g).map((v) => {

    if (/(\s)/.test(username) || /(\s)/.test(password)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <LoginModal
        loginVisible={loginVisible}
        loginForm={loginForm}
        handleCancel={handleCancel}
        toggleModal={toggleModal}
        onLoginFinish={onLoginFinish}
        loading={loginLoading}
      />

      <JoinModal
        joinVisible={joinVisible}
        joinForm={joinForm}
        handleCancel={handleCancel}
        toggleModal={toggleModal}
        onJoinFinish={onJoinFinish}
        loading={joinLoading}
      />
    </>
  );
});

export default AuthModal;
