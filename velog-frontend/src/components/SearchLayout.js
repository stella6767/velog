import { Layout } from 'antd';
import React from 'react';
import { Global } from '../style';
import AppHeader from './AppHeader';

const SearchLayout = (props) => {
  // const { principal } = useSelector(({ auth }) => ({
  //   principal: auth.principal,
  // }));

  return (
    <>
      <Layout>
        <Global />
        <AppHeader />
        {props.children}
      </Layout>
    </>
  );
};

export default SearchLayout;
