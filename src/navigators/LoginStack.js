import React from 'react';
import { useTheme } from 'native-base';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/login/LoginScreen';

import ResetPasswordScreen from '../screens/login/ResetPasswordScreen';
import FPSecureAccountScreen from '../screens/login/FPSecureAccountScreen/';
import ForgotPasswordScreen from '../screens/login/ForgotPasswordScreen';

import { screenOptions } from '../constants';
import FPDigitVerifyScreen from '../screens/login/FPDigitVerifyScreen/FPDigitVerifyScreen';

const Login = props => {
  const LoginStack = createStackNavigator();
  const { colors } = useTheme();

  return (
    <LoginStack.Navigator
      initialRouteName="UserLogin"
      screenOptions={{
        ...screenOptions,
        cardStyle: { backgroundColor: colors.brand.dark }
      }}
    >
      <LoginStack.Screen
        name="UserLogin"
        component={LoginScreen}
      />
      <LoginStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <LoginStack.Screen
        name="FPDigitVerify"
        component={FPDigitVerifyScreen}
      />
      <LoginStack.Screen
        name="FPSecureAccount"
        component={FPSecureAccountScreen}
      />
    </LoginStack.Navigator>
  );
};

export default Login;
