import { Col, Layout, Row } from 'antd';
import { Global } from '../style';
import AppHeader from './AppHeader';

const { Content } = Layout;

const AppLayout = (props) => {
  const { isHome } = props;

  // const { principal } = useSelector(({ auth }) => ({
  //   principal: auth.principal,
  // }));

  return (
    <Layout>
      <Global />
      <AppHeader isHome={isHome} />
      <Content>
        <Row>
          <Col xs={1} sm={1} md={2} lg={2} xl={3}></Col>
          <Col xs={22} sm={22} md={20} lg={20} xl={18}>
            {props.children}
          </Col>
          <Col xs={1} sm={1} md={2} lg={2} xl={3}></Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AppLayout;
