import React from 'react';
import {
  Actionsheet,
  Box,
  Flex,
  Pressable,
  ScrollView,
  useDisclose,
  useTheme
} from 'native-base';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

// nav icons
import HouseIcon from '../../assets/icons/HouseIcon';
import StaysIcon from '../../assets/icons/StaysIcon';
import ProfileIconV2 from '../../assets/icons/ProfileIcon-v2';
import EventsIconV2 from '../../assets/icons/EventsIcon-v2';
import RidesIcon from '../../assets/icons/RidesIcon';
import FoodIcon from '../../assets/icons/FoodIcon';
import CoworkIcon from '../../assets/icons/CoworkIcon';
import MoreIcon from '../../assets/icons/MoreIcon';
import { CommonActions } from '@react-navigation/native';

export default CustomBottomTab = ({
  state,
  descriptors,
  navigation,
  hide
}) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { colors } = useTheme();

  const onPress = (isFocused, key, name, actionSheet) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: key,
      canPreventDefault: true
    });

    if (!isFocused && !event.defaultPrevented) {
      if (name === 'Food') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Food' }]
        });
      } else {
        navigation.navigate({
          name: name,
          merge: true
        });
      }
    }
    actionSheet && onClose();
  };

  const onLongPress = key => {
    navigation.emit({
      type: 'tabLongPress',
      target: key
    });
  };

  const optionsIcons = {
    HouseIcon,
    StaysIcon,
    ProfileIconV2,
    EventsIconV2,
    RidesIcon,
    FoodIcon,
    CoworkIcon,
    MoreIcon
  };

  return (
    <View
      style={{
        ...styles.mainView,
        display: hide ? 'none' : 'flex'
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const hideLabel = options.hideInBottomTab;
        const isFocused = state.index === index;

        const Icon =
          optionsIcons[options.icon] || ProfileIconV2;

        return !hideLabel ? (
          <TouchableOpacity
            key={index}
            style={styles.bottomTabButton}
            accessibilityRole="button"
            accessibilityState={
              isFocused ? { selected: true } : {}
            }
            accessibilityLabel={
              options.tabBarAccessibilityLabel
            }
            onPress={() =>
              onPress(
                isFocused,
                route.key,
                route.name,
                false
              )
            }
            onLongPress={() => onLongPress(route.key)}
          >
            {isFocused && (
              <LinearGradient
                colors={[
                  'rgba(1,175,143,0)',
                  'rgba(1,175,143,1)',
                  'rgba(77,143,251,1)',
                  'rgba(158,129,210,1)',
                  'rgba(158,129,210,0)'
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0.1, 0.2, 0.5, 0.7, 0.9]}
                style={styles.bottomTabBox}
              />
            )}
            <Icon
              size="md"
              color={isFocused ? '#202020' : '#757575'}
            />
            <Text
              style={{
                ...styles.bottomTabText,
                color: isFocused ? '#202020' : '#757575'
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ) : null;
      })}
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="All"
        onPress={onOpen}
        style={styles.bottomTabButton}
      >
        <MoreIcon
          style={styles.bottomTabIcon}
          size="md"
          color="#757575"
        />
        <Text style={styles.bottomTabText}>ALL</Text>
      </TouchableOpacity>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <ScrollView w={'100%'}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const Icon =
                optionsIcons[options.icon] || ProfileIconV2;
              return (
                <Actionsheet.Item
                  key={route.key}
                  style={styles.actionSheetItem}
                  onPress={() =>
                    onPress(
                      false,
                      route.key,
                      route.name,
                      true
                    )
                  }
                >
                  <Flex
                    flexDirection="row"
                    alignItems="center"
                    borderRadius="none"
                  >
                    <Box style={styles.actionSheetIcon}>
                      <Icon size="md" color="#757575" />
                    </Box>
                    <Text
                      style={styles.actionSheetItemText}
                    >
                      {route.name === 'Login'
                        ? 'Log In'
                        : route.name}
                    </Text>
                  </Flex>
                </Actionsheet.Item>
              );
            })}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    elevation: 3,
    position: 'relative'
  },
  bottomTabBox: {
    width: '100%',
    height: 6,
    position: 'absolute',
    top: 0
  },
  bottomTabButton: {
    display: 'flex',
    padding: 3,
    flex: 1,
    paddingTop: 15,
    marginBottom: 5,
    alignItems: 'center'
  },
  bottomTabText: {
    color: '#757575',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginTop: 7
  },
  bottomTabIcon: {
    color: '#757575'
  },
  actionSheetIcon: {
    marginLeft: 10,
    marginRight: 7
  },
  actionSheetItem: {
    borderBottomColor: '#757575',
    borderBottomWidth: 1
  },
  actionSheetItemText: {
    marginLeft: 10,
    fontSize: 16
  }
});
