import { Button, Divider, Form, Input, Modal } from 'antd';
import React, { memo } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { StyledAntForm } from '../style';

const JoinModal = memo((props) => {
  const { joinVisible, joinForm, handleCancel, toggleModal, onJoinFinish, loading } = props;

  return (
    <div>
      {/* 회원가입 창 */}
      <Modal
        title="회원가입"
        visible={joinVisible}
        onCancel={handleCancel}
        width={550}
        footer={[
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <div style={{ marginTop: '0.3rem' }}>
              <span style={{}}>이미 계정이 있습니까? </span>
            </div>
            <Button type="link" style={{ color: 'green' }} onClick={toggleModal}>
              로그인
            </Button>
          </div>,
        ]}
      >
        <StyledAntForm form={joinForm} name="horizontal_login" layout="inline" onFinish={onJoinFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={!joinForm.isFieldsTouched(true) || !!joinForm.getFieldsError().filter(({ errors }) => errors.length).length}
              >
                회원가입
              </Button>
            )}
          </Form.Item>
        </StyledAntForm>
      </Modal>
    </div>
  );
});

export default JoinModal;
