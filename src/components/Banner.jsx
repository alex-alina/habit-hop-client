import React, { useState } from 'react';
import SvgIcon from '../components/SvgIcon';
import Div from '../core-components/Div';
import Paragraph from '../core-components/Paragraph';
import Span from '../core-components/Span';
import Button from '../core-components/Button';

const Banner = ({
  children,
  iconName,
  iconStroke = '#1A237E',
  ...restProps
}) => {
  const [isVisible, setVisibility] = useState(true);

  if (!isVisible) return null;

  return (
    <Div
      display="flex"
      justifyContent="space-between"
      bg="orange.0"
      borderWidth="2px"
      borderStyle="solid"
      borderColor="blue.1"
      borderRadius={2}
      p={3}
      {...restProps}
    >
      <Div display="flex" alignItems="center">
        <Span>
          <SvgIcon
            role="graphics-symbol"
            aria-hidden="true"
            width={20}
            height={20}
            name={iconName}
            stroke={iconStroke}
            style={{ marginRight: 6 }}
          />
        </Span>

        <Paragraph px={4}>{children}</Paragraph>
      </Div>
      <Button
        variant="iconButton"
        alignSelf="flex-start"
        onClick={() => setVisibility(!isVisible)}
        aria-label="Close banner"
      >
        <SvgIcon aria-hidden="true" width={16} height={16} name="close" />
      </Button>
    </Div>
  );
};

export default Banner;
