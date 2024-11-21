import React from 'react';
import { Icon, Text } from 'native-base';
import { Path, Line, G } from 'react-native-svg';

export default RequestsIcon = props => {
  const isHeader = props.isHeader ? props.isHeader : false;
  const scale = props.size === 'small' ? '.6' : '1';
  const fillColor = props.props?.color
    ? props.props.color
    : props.color
    ? props.color
    : '#202020';

  return (
    <>
      <Icon viewBox="0 0 51.09 33.13">
        <G
          fillRule="nonezero"
          fill="none"
          scale={scale}
          origin="50,10"
        >
          <Path
            d="M47.91,35.06H6.59c0-10.46,8-18.7,20.66-18.7C38.2,16.36,47.91,24.72,47.91,35.06Z"
            fill="none"
            stroke={`${fillColor}`}
            strokeLinecap="round"
            strokeWidth="4"
            transform="translate(-1.28 -9.69)"
          />
          <Line
            x1="25.56"
            y1="6.66"
            x2="25.56"
            y2="1.53"
            fill="none"
            stroke={`${fillColor}`}
            strokeLinecap="round"
            strokeWidth="4"
          />
          <Line
            x1="1.5"
            y1="31.63"
            x2="49.59"
            y2="31.63"
            fill="none"
            stroke={`${fillColor}`}
            strokeLinecap="round"
            strokeWidth="4"
          />
          <Line
            x1="19.21"
            y1="1.5"
            x2="32"
            y2="1.5"
            fill="none"
            stroke={`${fillColor}`}
            strokeLinecap="round"
            strokeWidth="4"
          />
        </G>
      </Icon>
      {isHeader && (
        <Text
          variant="bottomTab"
          mt={2}
          color={`${fillColor}`}
        >
          requests
        </Text>
      )}
    </>
  );
};
