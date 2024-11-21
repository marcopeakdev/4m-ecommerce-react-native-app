import {
  Box,
  Button,
  Checkbox,
  Heading,
  Image,
  Radio,
  Text,
  View
} from 'native-base';
import React, { useEffect, useState } from 'react';
import DotIcon from '../../../assets/icons/DeskModalDot';

const sumValue = arrayData => {
  return arrayData.reduce((sum, item) => sum + item * 1, 0);
};

function arrayUnique(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j])
        a.splice(j--, 1);
    }
  }

  return a;
}

let values = [];
let prev_guid = '';

const OrderOptionsBox = ({
  guid,
  title,
  description,
  isRequired,
  items,
  onSelect,
  selected,
  isCheckbox,
  setIsRequiredSatisfied
}) => {
  let [selectedValues, setSelectedValues] = useState([]);
  const defaultItem = items.find(
    item => item.isDefault === true
  );

  useEffect(() => {
    if (isRequired) {
      setIsRequiredSatisfied(false);
    }
  }, []);

  return (
    <View
      pt={8}
      pb={4}
      borderBottomColor="#eeeeee90"
      borderBottomWidth="1"
    >
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <View>
          <Heading
            fontSize="14.22px"
            fontWeight="400"
            fontFamily="CodecPro-Bold"
            lineHeight="12px"
          >
            {title.toUpperCase()}
          </Heading>
          {description && <Text mt="4">{description}</Text>}
        </View>
        {isRequired && (
          <View flexDirection="row">
            <DotIcon
              active={false}
              width={10}
              height={10}
              fill="#01AF8F"
            />
            <Text
              marginLeft="3px"
              fontSize="10px"
              lineHeight="9px"
              fontWeight="400"
              mt="1px"
            >
              Required
            </Text>
          </View>
        )}
      </View>
      <View>
        {!isCheckbox && (
          <Radio.Group
            defaultValue={
              defaultItem ? defaultItem.value : ''
            }
            value={selectedValues[0]}
            name={title}
            onChange={nextValue => {
              const val = items.find(
                v => v.guid === nextValue
              );
              const itemIndex = values.findIndex(val => val === selectedValues[0]);
              if (itemIndex > -1) {
                values.splice(itemIndex, 1);
              }
              values = [...values, nextValue];
              onSelect(val, true, 0, guid);
              setSelectedValues([nextValue]);
              setIsRequiredSatisfied(true);
              prev_guid = guid;
            }}
          >
            {items.map((item, index) => (
              <View key={"radio_" + index}>
                <Box mb={5}>
                  <Radio
                    colorScheme={'gray'}
                    value={item.guid}
                    key={index}
                    onPress={() => {
                      const filtered = values.filter(val => val === item.guid);
                      if (filtered.length > 0 && filtered[0] === item.guid) {
                        setSelectedValues(['']);
                        onSelect(item, false, 0, guid);
                        setIsRequiredSatisfied(false);
                        const itemIndex = values.findIndex(val => val === item.guid);
                        if(itemIndex > -1) {
                          values.splice(itemIndex, 1);
                        }
                      }
                    }}
                  >
                    <View
                      width="90%"
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text
                        marginLeft="10px"
                        fontSize="16px"
                        lineHeight="21px"
                        fontWeight="300"
                      >
                        {item.leftTitle}
                      </Text>
                      <Text
                        fontSize="14.22px"
                        fontWeight="400"
                        fontFamily="CodecPro-Bold"
                        lineHeight="12px"
                      >
                        {item.rightTitle}
                      </Text>
                    </View>
                  </Radio>
                </Box>
                {item.options && item.options.length > 0 && (
                  <View>
                    <Button.Group
                      isAttached
                      size="sm"
                      width="33%"
                    >
                      {item.options.map(option => (
                        <Button
                          style={
                            option.selected
                              ? { backgroundColor: 'black' }
                              : {}
                          }
                          variant={
                            option.selected
                              ? 'solid'
                              : 'outline'
                          }
                        >
                          <Text
                            style={
                              option.selected
                                ? { color: 'white' }
                                : { color: 'black' }
                            }
                          >
                            {option.label}
                          </Text>
                        </Button>
                      ))}
                    </Button.Group>
                  </View>
                )}
              </View>
            ))}
          </Radio.Group>
        )}
        {isCheckbox && (
          <View
          >
            {items.map((item, index) => (
              <View key={"checkbox_" + index}>
                <Box mb={5}>
                  <Checkbox
                    colorScheme={'gray'}
                    value={item.guid}
                    my={0}
                    key={index}
                    checked={selectedValues.indexOf(item.guid) > -1}
                    onChange={value => {
                      if (value) {
                        values = [...values, item.guid];
                      } else {
                        if (values.indexOf(item.guid) > -1) {
                          values.splice(values.indexOf(item.guid), 1);
                        }
                      }

                      const filtered = items.filter(
                        val => val.value > 0
                      );
                      const itemValues = items.map(val => val.guid);
                      const filterValues = values.filter(val => {
                        return itemValues.indexOf(val) > -1;
                      })

                      onSelect(item, value, 1, guid);
                      setSelectedValues([...filterValues]);
                    }}
                  >
                    <View
                      width="90%"
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mt="1"
                    >
                      <Text
                        marginLeft="10px"
                        fontSize="16px"
                        lineHeight="21px"
                        fontWeight="300"
                      >
                        {item.leftTitle}
                      </Text>
                      <Text
                        fontSize="14.22px"
                        fontWeight="400"
                        fontFamily="CodecPro-Bold"
                        lineHeight="12px"
                      >
                        {item.rightTitle}
                      </Text>
                    </View>
                  </Checkbox>
                </Box>
                {item.options && item.options.length > 0 && (
                  <View>
                    <Button.Group
                      isAttached
                      size="sm"
                      width="33%"
                    >
                      {item.options.map(option => (
                        <Button
                          style={
                            option.selected
                              ? { backgroundColor: 'black' }
                              : {}
                          }
                          variant={
                            option.selected
                              ? 'solid'
                              : 'outline'
                          }
                        >
                          <Text
                            style={
                              option.selected
                                ? { color: 'white' }
                                : { color: 'black' }
                            }
                          >
                            {option.label}
                          </Text>
                        </Button>
                      ))}
                    </Button.Group>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default OrderOptionsBox;
