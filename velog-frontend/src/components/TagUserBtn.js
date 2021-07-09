import React, { memo } from 'react';
import { StyledTagLi, StyledTagLink } from './style';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';

const TagUserBtn = memo((props) => {
  const { tag } = props;

  return (
    <>
      <Link>
        <Tag>
          <span>{tag.name}</span>
        </Tag>
      </Link>
    </>
  );
});

export default TagUserBtn;
