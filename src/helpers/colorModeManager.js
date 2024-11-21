import React from 'react';
import {
  NativeBaseProvider,
  StorageManager,
  ColorMode
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

// Define the colorModeManager,
// here we are using react-native-async-storage (https://react-native-async-storage.github.io/async-storage/)
const colorModeManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');

      if (val === 'system') {
        // return Appearance.getColorScheme()
        return Appearance.getColorScheme();
      }

      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async value => {
    try {
      await AsyncStorage.setItem('@color-mode', value);
    } catch (e) {
      console.log(e);
    }
  }
};

export default colorModeManager;
