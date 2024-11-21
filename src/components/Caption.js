import React from 'react';
import { Text } from 'native-base';

const Caption = props => {
  let captionStyle = {};

  if (props.title) {
    captionStyle = {
      fontWeight: 700,
      fontSize: 14,
      upperCase: true
    };
  } else if (props.body) {
    captionStyle = {
      fontWeight: 500,
      fontSize: 14,
      upperCase: false
    };
  }

  return (
    <Text
      fontSize={captionStyle.fontSize}
      fontWeight={captionStyle.fontWeight}
      _dark={{ color: 'white' }}
      _light={{ color: 'black' }}
      {...props}
    >
      {captionStyle.upperCase
        ? props.children.toUpperCase()
        : props.children}
    </Text>
  );
};

export default Caption;
