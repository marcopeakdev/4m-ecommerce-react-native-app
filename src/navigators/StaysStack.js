import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StaysHome from '../screens/stays/StaysHome';
import ViewStaysHome from '../screens/stays/ViewStaysHome';

const StaysStack = props => {
  const StaysStack = createStackNavigator();

  return (
    <StaysStack.Navigator
      initialRouteName="StaysHome"
      screenOptions={{
        headerShown: false
      }}
    >
      <StaysStack.Screen
        name="StaysHome"
        component={StaysHome}
      />
      <StaysStack.Screen
        name="ViewStaysHome"
        component={ViewStaysHome}
      />
    </StaysStack.Navigator>
  );
};

export default StaysStack;
