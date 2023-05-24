import React from 'react';
import Paragraph from '../core-components/Paragraph';

const FieldError = ({ children, ...props }) => {
  return (
    <Paragraph mb={2} color="error" {...props}>
      {children}
    </Paragraph>
  );
};

export default FieldError;
