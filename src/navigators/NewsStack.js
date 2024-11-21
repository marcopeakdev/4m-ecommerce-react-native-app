import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewsHome from '../screens/news/NewsHome';

const NewsStack = props => {
  const NewsStack = createStackNavigator();

  return (
    <NewsStack.Navigator
      initialRouteName="NewsHome"
      screenOptions={{
        headerShown: false
      }}
    >
      <NewsStack.Screen
        name="NewsHome"
        component={NewsHome}
      />
    </NewsStack.Navigator>
  );
};

export default NewsStack;
