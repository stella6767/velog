import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderBottomDiv, HeaderDateDiv, HeaderLeftDiv, HeaderSubDiv } from './style';
import { MoreOutlined } from '@ant-design/icons';

const HomeHeader = () => {
  return (

    <>
      <HeaderBottomDiv>
        <HeaderLeftDiv>
          <HeaderSubDiv>
            <Link to="/" className="HeaderSubA">
              <img src="/images/trending.svg" alt="" />
              트렌딩
            </Link>
            <Link to="/recent" className="HeaderSubA">
              <img src="/images/recent.svg" alt="" /> 최신
            </Link>
          </HeaderSubDiv>
          <HeaderSubDiv>
            <HeaderDateDiv>
              이번 주
              <img src="/images/down.svg" alt="" />
            </HeaderDateDiv>
          </HeaderSubDiv>
        </HeaderLeftDiv>
        <div>
          <MoreOutlined style={{ fontSize: '1.5rem' }} />
        </div>
      </HeaderBottomDiv>
    </>
  );
};

export default HomeHeader;
