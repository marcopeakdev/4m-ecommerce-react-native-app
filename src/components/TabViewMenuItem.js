import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  Pressable,
  Text,
  VStack
} from 'native-base';
import PlusIcon from '../../assets/icons/PlusIcon';
import MinusIcon from '../../assets/icons/MinusIcon';
import { formatCurrency } from '../helpers/formatStrings';
import TrashIcon from '../../assets/icons/TrashIcon';
import { ToastContext } from '../helpers/ToastContext';
import {
  getModiferOptions,
  getModifers
} from '../helpers/toastApiCalls';

const TabViewMenuItem = props => {
  const { name, quantity, price, guid, id, modifiers } =
    props.item.item;
  const { index } = props.item;
  const {
    removeItem,
    changeQty,
    color,
    tabQuantity,
    goBack,
    modifierOptions
  } = props;

  const itemModifiers = JSON.parse(modifiers);

  const { setCloseTabAlert } = useContext(ToastContext);

  const handleQuantityChange = type => {
    if (type === '+') {
      changeQty(id, quantity + 1);
    }

    if (type === '-') {
      changeQty(id, quantity - 1);
    }
  };

  return (
    <HStack space="4" mb="6">
      <Pressable
        onPress={() => {
          if (tabQuantity === 1) {
            removeItem(id, tabQuantity);
          } else {
            removeItem(id);
          }
        }}
      >
        <AspectRatio height="30" ratio={{ base: 1 / 1 }}>
          <Box
            borderRadius="full"
            backgroundColor={'brand.purple'}
            p="1"
            alignItems="center"
            justifyContent={'center'}
          >
            <TrashIcon size="xs" color="brand.dark" />
          </Box>
        </AspectRatio>
      </Pressable>

      <HStack flex="1" justifyContent={'space-between'}>
        <VStack flex="1">
          <Heading
            variant="subHeader2"
            fontSize="md"
            textTransform={'uppercase'}
          >
            {name}
          </Heading>

          {itemModifiers.length > 0 &&
            modifierOptions.length > 0 && (
              <VStack pl="4" pr="2">
                {itemModifiers.map(modifier => {
                  const targetModifier =
                    modifierOptions.find(
                      option =>
                        option[1].guid ===
                        modifier.selectionId
                    ) ?? {};

                  return (
                    <Text>{targetModifier[1]?.name}</Text>
                  );
                })}
              </VStack>
            )}
        </VStack>
        <VStack alignItems={'flex-end'} flex="1">
          <Heading variant="subHeader2" fontSize="md">
            {formatCurrency(price * quantity)}
          </Heading>
          <HStack
            justifyContent={'flex-end'}
            alignItems="center"
            space="1"
          >
            <Pressable
              onPress={() => {
                handleQuantityChange('-');
              }}
              isDisabled={quantity > 1 ? false : true}
            >
              <MinusIcon
                size="md"
                color={quantity > 1 ? color : '#ABABAB'}
              />
            </Pressable>
            <Box w="10">
              <Text
                fontSize="xl"
                lineHeight="24"
                fontWeight="600"
                mt={1}
                textAlign={'center'}
              >
                {quantity}
              </Text>
            </Box>

            <Pressable
              onPress={() => {
                handleQuantityChange('+');
              }}
              isDisabled={false}
            >
              <PlusIcon size="md" color={color} />
            </Pressable>
          </HStack>
        </VStack>
      </HStack>
    </HStack>
  );
};

export default TabViewMenuItem;
