import {
  Badge,
  Box,
  HStack,
  Pressable,
  Radio,
  Text,
  useColorModeValue,
  VStack
} from 'native-base';
import React from 'react';
import { formatCCProvider } from '../helpers/formatStrings';

const CardListItem = props => {
  const {
    item,
    setCardSelected,
    cardSelected,
    primaryCard,
    redactSelectedCard
  } = props;

  return (
    <HStack
      borderBottomWidth="2"
      borderColor="brand.lightGrayOnBlack"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      space="4"
      py="2"
    >
      <HStack alignItems="center" space="4">
        <Radio.Group
          _radio={{
            my: 0.5,
            ml: 1.5,
            colorScheme: 'brandPurple',
            _text: {
              lineHeight: 15
            }
          }}
          name={`${item.card_type} ending in
        ${item.last_four_digits}`}
          accessibilityLabel={`${item.card_type} ending in
        ${item.last_four_digits}`}
          onChange={value => setCardSelected(value)}
        >
          <Radio
            value={item.token}
            accessibilityLabel={`${item.card_type} ending in
        ${item.last_four_digits}`}
          />
        </Radio.Group>

        <VStack>
          <Text
            variant="captionTitle"
            textTransform="uppercase"
            bold
          >
            {formatCCProvider(item.card_type)} ending in{' '}
            {item.last_four_digits}
          </Text>
        </VStack>
        {item.token === primaryCard && (
          <Box width="75">
            <Badge
              borderRadius="5"
              _text={{ fontSize: '12' }}
            >
              Primary
            </Badge>
          </Box>
        )}
      </HStack>
    </HStack>
  );
};

export default CardListItem;
