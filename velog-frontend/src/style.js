import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  .logo {
    width: 38px;
  }

  .ant-layout-header {
    //display:block;
    //position:fixed;
    z-index: 100;
  }


 .ant-layout-content {
  padding-top: 1rem;
} 




.ant-card-cover > img{
  height: 300px;
  object-fit: fill;
}

/* .ant-form-inline {
    display: flex;
    flex-wrap: nowrap;
} */


`;
