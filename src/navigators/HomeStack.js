import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

const HomeStack = props => {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStack;
