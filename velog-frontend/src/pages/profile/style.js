import styled from 'styled-components';

export const StyledUserDescTopSection = styled.section`
  display: flex;
  height: 13.75rem;
`;

export const StyledUserThubnailDiv = styled.div`
  padding-right: 1.5rem;
  display: flex;
  flex-direction: column;
`;

export const StyledUserInfoDiv = styled.div`
  flex: 1 1 0%;
  padding-left: 1.5rem;
  border-left: 1px solid rgb(233, 236, 239);
`;

export const StyledImgUploadButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  background: rgb(18, 184, 134);
  color: white;
  border-radius: 4px;
  padding: 0px 1.25rem;
  height: 2rem;
  font-size: 1rem;
`;

export const StyledImgRemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  background: none;
  color: rgb(18, 184, 134);
  border-radius: 4px;
  padding: 0px 1.25rem;
  height: 2rem;
  font-size: 1rem;
  margin-top: 0.5rem;
`;

export const StyledUserDescBottomSection = styled.section`
  margin-top: 4rem;
`;

export const StyledSubDetailDiv = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const StyledProfileImg = styled.img`
  object-fit: cover;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  /* background-image: url('/images/userImage.jpg'); */
  display: block;
  margin-bottom: 1.25rem;
`;
