import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CoworkHome from '../screens/cowork/CoworkHome';
import Membership from '../screens/cowork/Membership';
import OrderReceipt from 'src/screens/cowork/checkout/OrderReceipt';
import Checkout from '../screens/cowork/checkout/Checkout';
import Terms from '../screens/cowork/Terms';
import Resources from '../screens/cowork/Resources';

const CoworkStack = () => {
  const CoworkStack = createStackNavigator();

  return (
    <CoworkStack.Navigator
      initialRouteName="CoworkHome"
      screenOptions={{
        headerShown: false
      }}
    >
      <CoworkStack.Screen
        name="CoworkHome"
        component={CoworkHome}
      />

      <CoworkStack.Screen
        name="Membership"
        component={Membership}
      />

      <CoworkStack.Screen
        name="OrderReceipt"
        component={OrderReceipt}
      />
      <CoworkStack.Screen
        name="CoWorkCheckout"
        component={Checkout}
      />
      <CoworkStack.Screen name="Terms" component={Terms} />
      <CoworkStack.Screen
        name="Resources"
        component={Resources}
      />
    </CoworkStack.Navigator>
  );
};

export default CoworkStack;
