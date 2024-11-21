import {
  Box,
  Heading,
  ScrollView,
  useColorModeValue
} from 'native-base';
import React from 'react';

const ProfileSettingsBasicItem = ({ route }, props) => {
  const { title, content } = route.params;

  return (
    <Box
      borderWidth={0}
      flex={1}
      pt={10}
      mt={10}
      px={4}
      safeArea
    >
      <Heading
        variant="header3"
        fontSize="xl"
        borderBottomWidth={5}
        borderBottomColor={useColorModeValue(
          'brand.dark',
          'brand.white'
        )}
      >
        {title}
      </Heading>
      <ScrollView mt={2} flex={1}>
        {content}
      </ScrollView>
    </Box>
  );
};

export default ProfileSettingsBasicItem;
