import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle` 

  .name{
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: bold;
    color: rgb(33, 37, 41);

  }

  .description {
    white-space: pre-wrap;
    font-size: 1.125rem;
    line-height: 1.5;
    margin-top: 0.25rem;
    color: rgb(73, 80, 87);
    letter-spacing: -0.004em;
  }

  .line-height-div{

    background: rgb(233, 236, 239);
    width: 100%;
    height: 1px;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }

  .head-wrapper {
    padding-left: 1rem;
    padding-right: 1rem;
}

.head-wrapper h1 {
    font-size: 2.25rem;
    line-height: 1.5;
    letter-spacing: -0.004em;
    margin-top: 0px;
    font-weight: 800;
    color: rgb(52, 58, 64);
    margin-bottom: 2rem;
    word-break: keep-all;
}


`;

export const StyledUserContainerDiv = styled.div`
  width: 768px;
  margin-left: auto;
  margin-right: auto;
`;

export const StyledUserVelogDiv = styled.div`
  margin-top: 5.625rem;
`;

export const StyledUserTopDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledUserDescDiv = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  margin-left: 1rem;
`;

export const StyledUserProfileImg = styled.img`
  display: block;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: rgb(0 0 0 / 6%) 0px 0px 4px 0px;
`;

/////여기까지 User.js

export const StyledPostDetailContainer = styled.div`
  width: 768px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
`;

export const StyledHeadDescDiv = styled.div`
  -webkit-box-align: center;
  align-items: center;
  font-size: 1rem;
  color: rgb(73, 80, 87);
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;

export const StyledDetailContentDiv = styled.div`
  /* display: table-cell;
  vertical-align: middle; */
  margin-top: 2rem;

  img {
    max-width: 100%;
    max-height: 500px;
    margin: 3rem auto;
    /* object-fit: fill; */
  }
`;

export const StyledDetailCommentDiv = styled.div``;
