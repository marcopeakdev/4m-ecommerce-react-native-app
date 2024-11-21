import React from 'react';
import { Box } from 'native-base';

const AuthCenter = props => {
  return (
    <Box
      bg="brand.dark"
      px={8}
      pb={8}
      pt={2}
      flex={1}
      alignItems="center"
      width="100%"
      safeArea
      {...props}
    >
      {props.children}
    </Box>
  );
};

export default AuthCenter;
