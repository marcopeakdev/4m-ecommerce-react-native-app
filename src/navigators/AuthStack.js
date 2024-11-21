import React from 'react';
import { useTheme } from 'native-base';

import { createStackNavigator } from '@react-navigation/stack';

import SetupStack from './SetupStack';
import LoginStack from './LoginStack';

import { screenOptions } from '../constants';

export default AuthStack = props => {
  const { colors } = useTheme();

  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator
      initialRouteName="Setup"
      screenOptions={{
        ...screenOptions,
        cardStyle: { backgroundColor: colors.brand.dark }
      }}
    >
      <AuthStack.Screen name="Setup" component={SetupStack} />
      <AuthStack.Screen name="Login" component={LoginStack} />
    </AuthStack.Navigator>
  );
};
