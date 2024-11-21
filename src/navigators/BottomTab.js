import React, { useContext } from 'react';

import { useColorModeValue, useTheme } from 'native-base';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import CoworkStack from './CoworkStack';
import FoodStack from './FoodStack';
import LoginStack from './LoginStack';
import SetupStack from './SetupStack';
import RidesStack from './RidesStack';
import StaysStack from './StaysStack';
import NewsStack from './NewsStack';
import EventsStack from './EventsStack';

import CustomBottomTab from '../components/CustomBottomTab';

import { screenOptions } from '../constants';

import { AppContext } from '../helpers/AppContext';

export default BottomTab = props => {
  const BottomTab = createBottomTabNavigator();
  const { colors } = useTheme();
  const { user, bottomTabHide } = useContext(AppContext);

  const inactiveTintColors = useColorModeValue(
    colors.brand.darkgrey,
    colors.brand.white
  );
  const tabBarStyleBackground = useColorModeValue(
    colors.brand.white,
    colors.brand.dark
  );
  const tabBarStyleBorderTop = useColorModeValue(
    colors.brand.lightgrey,
    colors.brand.darkgray
  );
  const cardStyleBackground = useColorModeValue(
    useColorModeValue(colors.brand.white, colors.brand.dark)
  );

  return (
    <BottomTab.Navigator
      initialRouteName={props.initialRouteName || 'Home'}
      tabBar={props => (
        <CustomBottomTab {...props} hide={bottomTabHide} />
      )}
      screenOptions={({ route, props }) => {
        return {
          ...screenOptions,
          tabBarActiveTintColor: colors.brand.purple,
          tabBarInactiveTintColor: inactiveTintColors,
          tabBarLabelStyle: {},
          tabBarItemStyle: {},
          tabBarShowLabel: false,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: 70,
            backgroundColor: tabBarStyleBackground,
            borderTopWidth: 2,
            borderTopColor: tabBarStyleBorderTop
          },
          cardStyle: {
            backgroundColor: cardStyleBackground
          }
        };
      }}
    >
      <BottomTab.Screen
        name="Stays"
        component={StaysStack}
        options={{
          icon: 'StaysIcon'
        }}
      />
      <BottomTab.Screen
        name="Food"
        component={FoodStack}
        options={{
          icon: 'FoodIcon'
        }}
      />
      <BottomTab.Screen
        name="Home"
        headerShown={false}
        component={HomeStack}
        options={{
          icon: 'HouseIcon'
        }}
      />
      <BottomTab.Screen
        name="Cowork"
        component={CoworkStack}
        options={{
          icon: 'CoworkIcon'
        }}
      />
      <BottomTab.Screen
        name="Rides"
        component={RidesStack}
        options={{
          hideInBottomTab: true,
          icon: 'RidesIcon'
        }}
      />
      {!user.id ? (
        <BottomTab.Screen
          name="Login"
          component={LoginStack}
          options={{
            hideInBottomTab: true,
            icon: 'ProfileIconV2'
          }}
        />
      ) : (
        <BottomTab.Screen
          name="Account"
          component={ProfileStack}
          options={{
            hideInBottomTab: true,
            icon: 'ProfileIconV2'
          }}
        />
      )}
      {!user.id && (
        <BottomTab.Screen
          name="Create An Account"
          component={SetupStack}
          options={{
            hideInBottomTab: true,
            icon: 'ProfileIconV2',
            tabBarLabel: 'Create An Account'
          }}
        />
      )}
    </BottomTab.Navigator>
  );
};
