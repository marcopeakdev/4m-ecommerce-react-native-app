import React from 'react';
import { Text } from 'native-base';

const AuthText = props => {
  return (
    <Text
      color="white"
      textAlign="center"
      lineHeight="18px"
      fontSize={props.caption ? 14.2 : 16}
      fontWeight={100}
      {...props}
    >
      {props.children}
    </Text>
  );
};

export default AuthText;
