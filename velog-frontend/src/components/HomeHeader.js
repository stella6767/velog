import React, { memo, useState } from "react";
import styled from "styled-components";
import logo_img from "../logo.svg";
import AuthModal from "./auth/ModalContainer";
import "./MyHeader.scss";

const HeaderTopDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding-left: 10rem;
  padding-right: 10rem;
`;

const HeaderBottomDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding-left: 10rem;
  padding-right: 10rem;
`;

const LoginBox = styled.div`
  display: flex;
  align-items: center;
`;

// const ColorButton = withStyles((theme) => ({
//   root: {
//     color: theme.palette.getContrastText(blueGrey[900]),
//     backgroundColor: blueGrey[900],
//     fontSize: 16,
//     marginLeft: 20,
//     borderRadius: 50,
//     height: 30,

//     "&:hover": {
//       backgroundColor: blueGrey[700],
//     },
//   },
// }))(Button);

const HeaderLeftDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const HeaderSubDiv = styled(HeaderLeftDiv)`
  width: 14rem;
`;

const HeaderDateDiv = styled.div`
  background: white;
  height: 2rem;
  width: 6rem;
  border-radius: 4px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-weight: 600;
  color: rgb(73, 80, 87);
  font-size: 0.875rem;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px;
  cursor: pointer;
`;

const HomeHeader = memo(() => {
  //랜더링 되는 부분

  const [loginVisible, setLoginVisible] = useState(false); //로그인 모달창이 보일지 안 보일지

  const showLoginModal = () => {
    setLoginVisible(true);
  };

  return (
    <header className="HomeHeader">
      <HeaderTopDiv>
        <div>
          <img src={logo_img} />
        </div>
        <LoginBox>
          <a>
            <img src="/images/search.svg" />
          </a>
          <div>
            {/* <ColorButton
              variant="contained"
              color="primary"
              onClick={showLoginModal}
            >
              로그인
            </ColorButton> */}
            {/* 모달 컨테이너 */}
            <AuthModal
              loginVisible={loginVisible}
              setLoginVisible={setLoginVisible}
            />
          </div>
        </LoginBox>
      </HeaderTopDiv>
      <HeaderBottomDiv>
        <HeaderLeftDiv>
          <HeaderSubDiv>
            <a className="HeaderSubA">
              <img src="/images/trending.svg" /> 트렌딩
            </a>
            <a className="HeaderSubA">
              <img src="/images/recent.svg" /> 최신
            </a>
          </HeaderSubDiv>
          <HeaderSubDiv>
            <HeaderDateDiv>
              이번 주
              <img src="/images/down.svg" />
            </HeaderDateDiv>
          </HeaderSubDiv>
        </HeaderLeftDiv>
        <div>
          <img src="/images/more.svg" />
        </div>
      </HeaderBottomDiv>
    </header>
  );
});

export default HomeHeader;
