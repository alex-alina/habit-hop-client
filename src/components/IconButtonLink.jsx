import React from 'react';
import Button from '../core-components/Button';
import SvgIcon from './SvgIcon';

const IconButtonLink = ({
  children,
  iconName,
  iconColor = '#1A237E',
  ...restProps
}) => {
  return (
    <Button variant="iconButtonLink" {...restProps}>
      {children}
      <SvgIcon
        aria-hidden="true"
        role="graphics-symbol"
        name={iconName}
        stroke={iconColor}
        style={{ marginLeft: 4 }}
        height={18}
        width={18}
      />
    </Button>
  );
};

export default IconButtonLink;
