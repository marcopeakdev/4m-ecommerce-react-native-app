import React from 'react';
import {
  useTheme,
  useColorModeValue,
  Button,
  Pressable,
  ChevronLeftIcon,
  Heading,
  HStack
} from 'native-base';

import { createStackNavigator } from '@react-navigation/stack';

import ProfileHomeScreen from '../screens/profile/ProfileHomeScreen';
import LoginInfo from '../screens/profile/LoginInfo';
import ProfileContactScreen from '../screens/profile/ProfileContactScreen';
import ProfileOptionsScreen from '../screens/profile/ProfileOptionsScreen';

import { screenOptions } from '../constants';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import ProfileSettingsBasicItem from '../screens/profile/ProfileSettingsBasicItem';
import PaymentMethods from '../screens/profile/PaymentMethods';
import ProfilePointScreen from '../screens/profile/ProfilePointScreen';

export default Profile = props => {
  const ProfileStack = createStackNavigator();
  const { colors } = useTheme();

  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileHome"
      screenOptions={{
        ...screenOptions,
        cardStyle: {
          backgroundColor: useColorModeValue(
            colors.brand.white,
            colors.brand.dark
          )
        }
      }}
    >
      <ProfileStack.Screen
        name="ProfileHome"
        component={ProfileHomeScreen}
        options={({ navigation }) => ({
          headerShown: false
        })}
      />
      <ProfileStack.Screen
        name="ProfilePoints"
        component={ProfilePointScreen}
        options={({ navigation }) => ({
          headerLeft: props => (
            <HStack alignItems="center" space="4">
              <Pressable
                alignItems="center"
                justifyContent="center"
                borderWidth={0}
                marginLeft={4}
                onPress={navigation.goBack}
              >
                <ChevronLeftIcon size="9" />
              </Pressable>
              <Heading
                fontSize={28}
                lineHeight={28}
                mt="2"
                borderWidth={0}
                textAlignVertical="center"
              >
                Points {'&'} Rewards
              </Heading>
            </HStack>
          )
        })}
      />
      <ProfileStack.Screen
        name="ProfileOptions"
        component={ProfileOptionsScreen}
        options={({ navigation }) => ({
          headerLeft: props => (
            <HStack alignItems="center" space="4">
              <Pressable
                alignItems="center"
                justifyContent="center"
                borderWidth={0}
                marginLeft={4}
                onPress={navigation.goBack}
              >
                <ChevronLeftIcon size="9" />
              </Pressable>
              <Heading
                fontSize={28}
                lineHeight={28}
                mt="2"
                borderWidth={0}
                textAlignVertical="center"
              >
                Profile Info
              </Heading>
            </HStack>
          )
        })}
      />
      <ProfileStack.Screen
        name="LoginInfo"
        component={LoginInfo}
        options={({ navigation }) => ({
          headerLeft: props => (
            <HStack alignItems="center" space="4">
              <Pressable
                alignItems="center"
                justifyContent="center"
                borderWidth={0}
                marginLeft={4}
                onPress={navigation.goBack}
              >
                <ChevronLeftIcon size="9" />
              </Pressable>
              <Heading
                fontSize={28}
                lineHeight={28}
                mt="2"
                borderWidth={0}
                textAlignVertical="center"
              >
                Login Info
              </Heading>
            </HStack>
          )
        })}
      />
      <ProfileStack.Screen
        name="ProfileContact"
        component={ProfileContactScreen}
        options={({ navigation }) => ({
          headerLeft: props => (
            <HStack alignItems="center" space="4">
              <Pressable
                alignItems="center"
                justifyContent="center"
                borderWidth={0}
                marginLeft={4}
                onPress={navigation.goBack}
              >
                <ChevronLeftIcon size="lg" />
              </Pressable>
              <Heading
                fontSize={28}
                lineHeight={28}
                mt="2"
                borderWidth={0}
                textAlignVertical="center"
              >
                App Settings
              </Heading>
            </HStack>
          ),
          headerTitle: props => (
            <Heading
              fontSize={16}
              lineHeight={16}
              borderWidth={0}
              textAlign="center"
              textAlignVertical="center"
            >
              APP SETTINGS
            </Heading>
          )
        })}
      />
      <ProfileStack.Screen
        name="ProfileSettingsBasicItem"
        component={ProfileSettingsBasicItem}
        options={({ navigation }) => ({
          headerLeft: props => (
            <HStack alignItems="center" space="4">
              <Pressable
                alignItems="center"
                justifyContent="center"
                borderWidth={0}
                marginLeft={4}
                onPress={navigation.goBack}
              >
                <ChevronLeftIcon size="lg" />
              </Pressable>
              <Heading
                fontSize={28}
                lineHeight={28}
                mt="2"
                borderWidth={0}
                textAlignVertical="center"
              >
                App Settings
              </Heading>
            </HStack>
          )
        })}
      />
      <ProfileStack.Screen
        name="PaymentMethods"
        component={PaymentMethods}
        options={({ navigation }) => ({
          headerLeft: props => (
            <HStack alignItems="center" space="4">
              <Pressable
                alignItems="center"
                justifyContent="center"
                borderWidth={0}
                marginLeft={4}
                onPress={navigation.goBack}
              >
                <ChevronLeftIcon size="lg" />
              </Pressable>
              <Heading
                fontSize={28}
                lineHeight={28}
                mt="2"
                borderWidth={0}
                textAlignVertical="center"
              >
                Payment Methods
              </Heading>
            </HStack>
          )
        })}
      />
    </ProfileStack.Navigator>
  );
};
