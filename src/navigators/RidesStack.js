import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RidesHome from '../screens/rides/RidesHome';

const RidesStack = props => {
  const RidesStack = createStackNavigator();

  return (
    <RidesStack.Navigator
      initialRouteName="Rides"
      screenOptions={{
        headerShown: false
      }}
    >
      <RidesStack.Screen
        name="RidesHome"
        component={RidesHome}
      />
    </RidesStack.Navigator>
  );
};

export default RidesStack;
