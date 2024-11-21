import {
  Box,
  Button,
  Heading,
  HStack,
  Pressable,
  Text,
  useColorModeValue,
  View,
  VStack
} from 'native-base';
import React, { Fragment, useState } from 'react';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop
} from 'react-native-svg';

const TabbedPanel = props => {
  const { tabs, onChangeTab } = props;

  const [tab, setTab] = useState(tabs[0].title);

  const handleChangeTab = tabClicked => {
    if (onChangeTab) {
      onChangeTab(tabClicked);
    }
    setTab(tabClicked);
  };

  return (
    <VStack flex={1}>
      <HStack
        mb={0}
        justifyContent="center"
        space={3}
        borderBottomWidth={1}
        borderBottomColor={useColorModeValue(
          'brand.lightgray',
          'brand.lightgray'
        )}
      >
        {tabs.map((tabItem, index) => {
          return (
            <Pressable
              key={`${index}-tabbedmenu-${tabItem.title}`}
              justifyContent="center"
              variant="tabSelector"
              paddingTop={0}
              paddingBottom={0}
              borderRadius={1}
              minWidth="120px"
              bg={useColorModeValue(
                'brand.white',
                'brand.dark'
              )}
              _active={{
                bg: useColorModeValue(
                  'brand.white',
                  'brand.dark'
                )
              }}
              _pressed={{
                bg: useColorModeValue(
                  'brand.white',
                  'brand.dark'
                )
              }}
              _disabled={{
                bg: useColorModeValue(
                  'brand.white',
                  'brand.dark'
                )
              }}
              onPress={() => {
                handleChangeTab(`${tabItem.title}`);
              }}
            >
              <Heading
                variant="captionTitle"
                fontSize={
                  tabItem.fontSize ? tabItem.fontSize : 'xs'
                }
                fontHeight="26"
                fontWeight={600}
                color={
                  tab === `${tabItem.title}`
                    ? useColorModeValue(
                      'brand.dark',
                      'brand.white'
                    )
                    : 'brand.grey'
                }
                textAlign="center"
                position={'relative'}
                paddingBottom="2"
              >
                {tabItem.title}
              </Heading>
              {tab === tabItem.title && (
                <Svg
                  style={{
                    position: 'relative',
                    top: 0,
                    left: 2
                  }}
                  width={"100%"}
                  height={5}
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <Path fill="url(#a)" d="M0 0h116v5H0z" />
                  <Defs>
                    <LinearGradient
                      id="a"
                      x1={0.991}
                      y1={9.167}
                      x2={114.827}
                      y2={4.731}
                      gradientUnits="userSpaceOnUse"
                    >
                      <Stop
                        stopColor="#01AF8F"
                        stopOpacity={0}
                      />
                      <Stop
                        offset={0.145}
                        stopColor="#01AF8F"
                      />
                      <Stop
                        offset={0.8}
                        stopColor="#9E81D2"
                      />
                      <Stop
                        offset={1}
                        stopColor="#9E81D2"
                        stopOpacity={0}
                      />
                    </LinearGradient>
                  </Defs>
                </Svg>
              )}
            </Pressable>
          );
        })}
      </HStack>
      {tabs.map((tabItem, index) => {
        if (tab === tabItem.title) {
          return (
            <Box
              key={`${index}-tabbedcontent-${tabItem.title}`}
              height="100%"
            >
              {tab === tabItem.title && tabItem.content}
            </Box>
          );
        } else {
          return (
            <Box
              key={`${index}-tabbedcontent-${tabItem.title}-empty`}
            />
          );
        }
      })}
    </VStack>
  );
};

export default TabbedPanel;
