import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    .ant-form-item {
        border: none;
        margin-bottom: 10px;
    }

    .titleDiv {
        .ant-input{
            height: 5rem;
            font-size: 3rem;
        }

        .ant-input:placeholder-shown {
        text-overflow: ellipsis;
        border: none;
        font-size: 3rem;
        }

    }

    .ql-editor {
        font-size: 2rem;
    }

    .ql-editor::placeholder{
        font-size: 6rem;
    }

`;

export const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 3;
`;
