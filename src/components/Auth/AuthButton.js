import React, { useEffect, useState } from 'react';
import { Button, Text } from 'native-base';
import { Keyboard } from 'react-native';

const AuthButton = props => {
  const { onPress } = props;

  useEffect(() => {
    Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow
    );
    Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide
    );

    return () => {
      Keyboard.removeListener(
        'keyboardDidShow',
        _keyboardDidShow
      );
      Keyboard.removeListener(
        'keyboardDidHide',
        _keyboardDidHide
      );
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] =
    useState(undefined);
  const _keyboardDidShow = () =>
    setKeyboardStatus('Keyboard Shown');
  const _keyboardDidHide = () =>
    setKeyboardStatus('Keyboard Hidden');

  return (
    <Button
      variant="purple"
      display={
        keyboardStatus === 'Keyboard Shown'
          ? 'none'
          : 'flex'
      }
      onPress={onPress}
      size="lg"
      isDisabled={
        props.active === undefined
          ? false
          : props.active === true
          ? false
          : true
      }
      _disabled={{
        bg: 'brand.lightGrayOnBlack',
        opacity: 1,
        _text: { opacity: 0.4 }
      }}
    >
      {props.children}
    </Button>
  );
};

export default AuthButton;
