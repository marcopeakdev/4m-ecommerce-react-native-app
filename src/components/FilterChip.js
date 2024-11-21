import {
  Badge,
  Box,
  HStack,
  Text,
  useColorModeValue,
  useTheme
} from 'native-base';
import React from 'react';
import CancelIcon from '../../assets/icons/CancelIcon';

const FilterChip = props => {
  const { name, active, last } = props;
  const { colors } = useTheme();

  const mr = last ? 20 : 6;
  const activeColors = active
    ? [colors.brand.blue, colors.brand.purple]
    : [colors.brand.dark, colors.brand.dark];

  return (

    <Badge
      border="2"
      borderColor="black"
      flexDirection={'row'}
      rounded="full"
      backgroundColor={
        active
          ? 'rgba(225,220,255,1)'
          : useColorModeValue('brand.white', 'brand.dark')
      }
      m={active ? '.5' : '4px'}
      _text={{
        fontSize: 'xs',
        fontWeight: 300,
        color: useColorModeValue(
          'brand.dark',
          'brand.white'
        )
      }}
      justifyContent={'center'}
    >
      <HStack space="0" justifyContent={'center'}>
        <Text fontSize="14">{name}</Text>

        {active && (
          <Box mt="-0.5" ml="2">
            <CancelIcon
              size="xs"
              color={useColorModeValue(
                'brand.dark',
                'brand.white'
              )}
            />
          </Box>
        )}
      </HStack>
    </Badge>
  );
};

export default FilterChip;
