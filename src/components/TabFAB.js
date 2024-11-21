import { Box, Button, HStack, Text } from 'native-base';
import React, { useContext } from 'react';
import TabIcon from '../../assets/icons/TabIcon';
import { formatCurrency } from '../helpers/formatStrings';
import { ToastContext } from '../helpers/ToastContext';
import { getPriceOfTab } from '../helpers/ToastContextHelpers';

const TabFAB = props => {
  const { latestAWSPayload } = useContext(ToastContext);

  return (
    <>
      {latestAWSPayload &&
      Object.keys(latestAWSPayload).length > 0 &&
      latestAWSPayload.selections.length > 0 ? (
        <Box
          position="absolute"
          bottom="0"
          left="0"
          w="100%"
          alignContent="center"
          px="4"
          pb="6"
        >
          <Button
            variant="purple"
            position="relative"
            paddingTop="2"
            paddingBottom="2"
            onPress={() => {
              props.navigate('ViewTab');
            }}
            _disabled={{
              bg: 'brand.lightGrayOnBlack',
              opacity: 1,
              _text: { opacity: 0.4 }
            }}
          >
            <HStack
              justifyContent={'space-between'}
              space="10"
            >
              <HStack alignItems={'center'} space="2">
                <TabIcon color="brand.dark" />
                <Text
                  marginBottom="-4px"
                  fontWeight="700"
                  textTransform="uppercase"
                  textAlignVertical="center"
                  textAlign="center"
                  color="brand.dark"
                >
                  View Tab
                </Text>
              </HStack>
              <Box justifyContent={'center'}>
                <Text
                  marginBottom="-4px"
                  fontWeight="700"
                  textTransform="uppercase"
                  textAlignVertical="center"
                  textAlign="center"
                  color="brand.dark"
                >
                  {formatCurrency(
                    getPriceOfTab(latestAWSPayload)
                  )}
                </Text>
              </Box>
            </HStack>
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default TabFAB;
