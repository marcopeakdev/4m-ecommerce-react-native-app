import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Dimensions } from 'react-native';
import {
  View,
  Input,
  Text,
  useColorModeValue,
  useTheme
} from 'native-base';

const CustomInput = props => {
  const {
    label,
    containerProps,
    style,
    labelStyles,
    inputBorderColor,
    inputBorderWidth,
    onChangeText,
    validation,
    ...remProps
  } = props;

  const { colors } = useTheme();

  const [showError, setShowError] = useState(false);
  const [isValid, serIsValid] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const onFocus = () => {
    setIsActive(true);
  };

  const onBlur = () => {
    !showError && setShowError(true);
    setIsActive(false);
  };

  const onChange = async text => {
    onChangeText(text);
    if (validation) {
      const isValid = await validation.isValid(text);
      serIsValid(isValid);
    }
  };

  let borderColor = inputBorderColor || '#FFFFFF';
  if (!isValid && !isActive && showError) {
    borderColor = colors.red;
  }
  if (!isActive && isValid) {
    borderColor = colors.purple;
  }

  return (
    <View
      mb="24px"
      width={Dimensions.get('window').width - 38}
      {...containerProps}
    >
      <Text
        color="#FFFFFF"
        mb="4px"
        fontSize="14.22"
        lineHeight="16px"
        {...labelStyles}
      >
        {label}
      </Text>
      <Input
        bgColor="#404040"
        borderColor={borderColor}
        borderWidth={inputBorderWidth || '2px'}
        rounded="5px"
        height="52px"
        style={{ color: '#FFFFFF', ...style }}
        px="18px"
        fontWeight="300"
        onBlur={onBlur}
        onChangeText={onChange}
        onFocus={onFocus}
        {...remProps}
      />
    </View>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string,
  containerProps: PropTypes.object,
  style: PropTypes.object,
  labelStyles: PropTypes.object,
  inputBorderColor: PropTypes.string,
  inputBorderWidth: PropTypes.string,
  onChangeText: PropTypes.func,
  validation: PropTypes.any
};

export default CustomInput;
