import styled from 'styled-components';
import {
  background,
  border,
  color,
  display,
  flexbox,
  layout,
  position,
  space,
  shadow,
  textAlign,
  typography,
} from 'styled-system';

const CoreSvg = styled('svg')(
  background,
  border,
  color,
  display,
  flexbox,
  layout,
  position,
  space,
  shadow,
  textAlign,
  typography
);

import React from 'react';

const Svg = ({
  paths,
  style = {},
  fill = 'none',
  stroke = '#1A237E',
  strokeWidth = '4',
  strokeLinejoin = 'round',
  strokeLinecap = 'round',
  width = '26px',
  height = '26px',
  viewBox = '0 0 48 48',
  ...props
}) => (
  <CoreSvg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {Object.values(paths).map((path, i) => {
      return (
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin={strokeLinejoin}
          strokeLinecap={strokeLinecap}
          d={path}
          key={i}
        />
      );
    })}
  </CoreSvg>
);

export default Svg;
