import React from 'react';
import { useTheme } from 'native-base';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import SignUpScreen from '../screens/setup/SignUpScreen';

import SecureAccountScreen from '../screens/setup/SecureAccountScreen';
import DigitVerifyScreen from '../screens/setup/DigitVerifyScreen';

import { screenOptions } from '../constants';

const Setup = props => {
  const SetupStack = createStackNavigator();

  const { colors } = useTheme();

  return (
    <SetupStack.Navigator
      initialRouteName="SignUp"
      screenOptions={{
        ...screenOptions,
        cardStyle: { backgroundColor: colors.brand.dark }
      }}
    >
      <SetupStack.Screen
        name="Splash"
        component={SplashScreen}
      />
      <SetupStack.Screen
        name="SignUp"
        component={SignUpScreen}
      />
      <SetupStack.Screen
        name="SecureAccount"
        component={SecureAccountScreen}
      />

      <SetupStack.Screen name="6-DigitVerification">
        {screenProps => (
          <DigitVerifyScreen
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </SetupStack.Screen>
    </SetupStack.Navigator>
  );
};

export default Setup;
