import React from 'react';
import { Box, Heading, Text } from 'native-base';

const AuthHeadingWarning = props => {
  return (
    <Box
      backgroundColor="brand.purpleShade3"
      borderRadius={3}
      padding={3}
      marginTop={4}
    >
      <Text
        textAlign="center"
        color="brand.dark"
        variant="bodyCaptionText"
        {...props}
      >
        {props.children}
      </Text>
    </Box>
  );
};

export default AuthHeadingWarning;
