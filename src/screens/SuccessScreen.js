import React from 'react';
import { Center, Heading, Text } from 'native-base';

const SuccessScreen = ({ navigation, route }, props) => {
  return (
    <Center
      borderWidth={0}
      flex={1}
      mt={10}
      pt={10}
      px={4}
      safeArea
    >
      <Heading variant="header1" fontSize="3xl">
        Request Received!
      </Heading>
      <Text mb={20}>We're on it!</Text>
    </Center>
  );
};

export default SuccessScreen;
