import { Box } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const HideWhenKeyboardShown = props => {
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
    <Box
      {...props.props}
      display={
        keyboardStatus === 'Keyboard Shown'
          ? 'none'
          : 'flex'
      }
    >
      {props.children}
    </Box>
  );
};

export default HideWhenKeyboardShown;
