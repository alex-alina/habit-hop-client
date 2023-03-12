import React from 'react';

import SvgIcon from '../components/SvgIcon';
import Button from '../core-components/Button';
const IconButton = ({
  children,
  clickHandler,
  variant,
  iconName,
  stroke = '#1A237E',
  ...restProps
}) => {
  return (
    <Button
      variant={variant}
      display="flex"
      justifyContent="center"
      alignItems="center"
      onClick={clickHandler}
      {...restProps}
    >
      {children}
      <SvgIcon
        width={18}
        height={18}
        name={iconName}
        stroke={stroke}
        style={{ marginLeft: 8 }}
      />
    </Button>
  );
};

export default IconButton;
