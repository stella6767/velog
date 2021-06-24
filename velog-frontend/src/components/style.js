import styled, { createGlobalStyle } from 'styled-components';
import { Dropdown, Form } from 'antd';
import { Link } from 'react-router-dom';

export const Global = createGlobalStyle`
  .loginButtonDiv{
    .ant-btn{
    color: #fff;
    height: 30px;
    font-size: 16px;
    border-radius: 50px;
    background-color: #263238;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    padding: 6px 16px;
    min-width: 64px;
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    border: 0;
    cursor: pointer;
    margin: 0;
    display: inline-flex;
    outline: 0;
    position: relative;
    align-items: center;
    user-select: none;
    vertical-align: middle;
    justify-content: center;
    text-decoration: none;
    word-break: keep-all;
    background: rgb(52,58,64);
    z-index: 1;
    /* span {
        color:black;
    } */
   }
  }

  .ant-card {
    border-radius: 4px;
    width: 20rem;
    box-shadow: 1px 1px 3px 1px #dadce0;
    transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
    /* height: 25rem; */
  }

  .ant-card-cover > img {
    height: auto;
    object-fit: cover;
  }

.ant-card-body {
    padding: 15px;
  }

.ant-card-meta-description {
  display:-webkit-box;
  overflow: hidden;
  height: 3.6rem;
  text-overflow: ellipsis;
  word-wrap:break-word; 
  line-height: 1.2rem;
  -webkit-box-orient: vertical;

  }

.ant-layout-content {
    //padding-top: 10rem; // 헤더 높이만큼 여백부여
}

// 자바스크립트로 추가될 클래스 .

/* .ant-dropdown {
    width: 200px; 
}
.ant-dropdown-menu-item{
  margin: 1em auto 2em;
}  */


`;

export const HeaderTopDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding-left: 1rem;
`;

export const LoginBox = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledLoginSuccessDiv = styled.div`
  display: flex;
  margin-left: 1rem;
`;

export const StyledUserImg = styled.img`
  display: block;
  height: 2rem;
  width: 2rem;
  box-shadow: rgb(0 0 0 / 9%) 0px 0px 8px;
  border-radius: 50%;
  object-fit: cover;
  transition: all 0.125s ease-in 0s;
  background-image: url('/images/search.svg');
`;

export const HeaderBottomDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

export const HeaderLeftDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const HeaderSubDiv = styled(HeaderLeftDiv)`
  width: 14rem;
`;

export const HeaderDateDiv = styled.div`
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

export const StyledAppHeader = styled.header`
  align-items: center;
  width: 100%;
  z-index: 10;
  box-shadow: #f8f9fa 0px 0px 8px;
  padding-left: 2rem;
  padding-right: 2rem;
  top: 0;
  left: 0;

  @media only screen and (min-width: 900px) {
    padding-left: 10rem;
    padding-right: 10rem;
    //900px 이상이면 적용
  }
`;

export const StyledAntForm = styled(Form)`
  flex-wrap: nowrap;
`;

export const StyledPostCardDateDiv = styled.div`
  font-size: 0.75rem;
  line-height: 1.5;
  color: rgb(134, 142, 150);
  margin-top: 1rem;
`;

export const StyledPostCardFootDiv = styled.div`
  border-top: 1px solid rgb(248, 249, 250);
  display: flex;
  font-size: 0.75rem;
  line-height: 1.5;
  margin-top: 0.2rem;
  justify-content: space-between;
  padding-top: 0.2rem;
`;

export const StyledPostBoxDiv = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;
  line-height: 1.5;

  h2 {
    font-size: 1.5rem;
    margin: 0px;
    color: rgb(33, 37, 41);
    word-break: keep-all;
  }

  p {
    margin-bottom: 2rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    color: rgb(73, 80, 87);
    word-break: keep-all;
    overflow-wrap: break-word;
  }

  .tags-wrapper {
    margin-bottom: -0.875rem;
  }

  .subinfo {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-top: 1rem;
    color: rgb(134, 142, 150);
    font-size: 0.875rem;

    .separator {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  }
`;

export const StyledDropdown = styled(Dropdown)`
  //이거 적용을 어떻게 하지.
  .ant-dropdown {
    width: 200px;
  }
`;

export const StyledPostContentP = styled.p`
  margin-bottom: 2rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  color: rgb(73, 80, 87);
  word-break: keep-all;
  overflow-wrap: break-word;
`;

export const StyledTagLink = styled(Link)`
  margin-bottom: 0.875rem;
  background: rgb(241, 243, 245);
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2rem;
  border-radius: 1rem;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  margin-right: 0.875rem;
  color: rgb(12, 166, 120);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
`;
