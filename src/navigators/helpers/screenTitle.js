import React from 'react';
import { Heading, HStack } from 'native-base';
import InboxIcon from '../../../assets/icons/InboxIcon';

const screenTitle = (title, icon) => {
  return (
    <HStack alignItems="center" space={2}>
      <InboxIcon size="small" />

      <Heading fontSize={16}>{title}</Heading>
    </HStack>
  );
};

export default screenTitle;
