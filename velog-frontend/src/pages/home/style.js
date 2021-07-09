import styled from 'styled-components';

export const StyledMainDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  /* grid-template-columns: 1fr 1fr 1fr; */
  row-gap: 2rem;
  column-gap: 2rem;
  margin-bottom: 100px;
`;
