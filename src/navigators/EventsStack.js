import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EventsHome from '../screens/events/EventsHome';

const EventsStack = props => {
  const EventsStack = createStackNavigator();

  return (
    <EventsStack.Navigator
      initialRouteName="EventsHome"
      screenOptions={{
        headerShown: false
      }}
    >
      <EventsStack.Screen
        name="EventsHome"
        component={EventsHome}
      />
    </EventsStack.Navigator>
  );
};

export default EventsStack;
