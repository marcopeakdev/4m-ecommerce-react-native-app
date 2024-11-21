import React from 'react';
import { Heading } from 'native-base';

const AuthHeading = props => {
  return (
    <Heading
      fontSize={'3xl'}
      textAlign="center"
      color="brand.white"
      lineHeight={32}
      variant="header1"
      {...props}
      pt={1}
    >
      {props.children}
    </Heading>
  );
};

export default AuthHeading;
