import React from 'react';
import { Icon, Text } from 'native-base';
import { Path, Circle, G } from 'react-native-svg';

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
      <Icon viewBox="0 0 37.05 37.05">
        <G
          fillRule="nonezero"
          fill="none"
          scale={scale}
          origin="50,50"
        >
          <Path
            d="M43.77,25.86a17,17,0,1,1-17-17A16.94,16.94,0,0,1,43.77,25.86Z"
            fill="none"
            stroke={`${fillColor}`}
            strokeLinecap="round"
            strokeWidth="3"
            transform="translate(-8.22 -7.33)"
          />
          <Circle
            cx="18.99"
            cy="14.44"
            r="5.68"
            fill="none"
            stroke={`${fillColor}`}
            strokeLinecap="round"
            strokeWidth="4"
          />
          <Path
            d="M36.63,39.13c0,.19,0,.39,0,.58a17,17,0,0,1-18.77.66,10.08,10.08,0,0,1-.07-1.24c0-6,4.22-10.8,9.43-10.8S36.63,33.17,36.63,39.13Z"
            fill="none"
            stroke={`${fillColor}`}
            strokeLinecap="round"
            strokeWidth="3"
            transform="translate(-8.22 -7.33)"
          />
        </G>
      </Icon>
      {isHeader && (
        <Text
          variant="bottomTab"
          mt={2}
          color={`${fillColor}`}
        >
          profile
        </Text>
      )}
    </>
  );
};
