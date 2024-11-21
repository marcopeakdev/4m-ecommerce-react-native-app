import {
  Box,
  Heading,
  Button,
  VStack,
  HStack,
  useColorModeValue,
  ScrollView,
  Center,
  View,
  Text,
  Progress
} from 'native-base';

import React, {
  useState,
  useContext,
  useEffect
} from 'react';

import { ToastContext } from '../../helpers/ToastContext';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import FoodLineContainer from '../../components/FoodLineContainer';

import TabFAB from '../../components/TabFAB';

import FoodIcon from '../../../assets/icons/FoodIcon';
import SpecialsIcon from '../../../assets/icons/SpecialsIcon';
import RewardsIcon from '../../../assets/icons/RewardsIcon';
import BrandGradientIcon from '../../components/SplashGradientIcon';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../../helpers/AppContext';
import FilterChip from '../../components/FilterChip';
import FoodItemContainer from '../../components/FoodItemContainer';
import { getEntriesByType } from '../../helpers/contentfulApiCalls';
import {
  DINE_IN,
  DINE_IN_NAME,
  IN_STOCK_VALUE,
  TAKE_OUT,
  TAKE_OUT_NAME
} from '../../constants/food';
import TabbedPanel from '../../components/TabbedPanel';

const FoodMenuHome = ({ navigation, route }, props) => {
  const { selectTab, selectMenuId } = route.params ?? {};
  const { user, setBottomTabHide } = useContext(AppContext);

  useFocusEffect(() => {
    setBottomTabHide(true);

    return () => setBottomTabHide(false);
  });

  // Contentful
  const [contentfulFoodLines, setContentfulFoodLines] =
    useState(null);

  useEffect(async () => {
    try {
      const contentful = await getEntriesByType('foodLine');
      setContentfulFoodLines(contentful);
    } catch (error) {
      console.log('Error getting Food Lines');
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchTiers = async () => {
      let data = await getEntriesByType('RewardTier');
      let tierData = data
        .filter(item => item.fields.tag)
        .sort((a, b) => {
          if (a.fields.name < b.fields.name) {
            return -1;
          }
          if (a.fields.name > b.fields.name) {
            return 1;
          }
          return 0;
        });

      setTierData(tierData);
    };
    fetchTiers();
  }, []);

  // tag filter button selection (Beverages, Food, Specials, Rewards)
  const [filterSelection, setFilterSelection] = useState(
    selectTab ? selectTab : ''
  );

  // menu filter button (Food Lines vs. Full Menu)
  const [menuFilter, setMenuFilter] = useState(
    selectTab ? 'Full Menu' : 'Food Lines'
  );

  // full menu filter chips for menu groups
  const [filters, setFilters] = useState([]);

  const [foodItems, setFoodItems] = useState(null);
  const [allTierData, setTierData] = useState([]);

  const {
    menus,
    restaurant,
    selectedTable,
    selectedDiningOption,
    orderTime,
    latestAWSPayload,
    setLatestAWSPayload
  } = useContext(ToastContext);

  const allMenuGroupNames = [];
  const allMenuGroups = [];
  let selectedMenu = null;

  let filteredMenus;

  if (latestAWSPayload.diningOptionName === TAKE_OUT) {
    // filter the menu

    filteredMenus = menus.filter(
      menu => menu[1].name !== 'Bar 19'
    );
  } else {
    // set filteredMenus to menus
    filteredMenus = menus;
  }

  filteredMenus.forEach((menu, index) => {
    const { menuGroups, name } = menu[1];

    menuGroups.forEach(group => {
      if (!allMenuGroupNames.includes(group.name)) {
        allMenuGroupNames.push(group.name);

        allMenuGroups.push({
          name: group.name,
          foodLineImage: menu[1].image,
          lineName: name,
          menuGroups: [
            { ...group, lineImage: menu[1].image }
          ]
        });
      } else {
        allMenuGroups[
          allMenuGroupNames.indexOf(group.name)
        ].menuGroups.push({
          ...group,
          lineImage: menu[1].image
        });
      }
      group.menuItems.forEach(menu => {
        if (menu.guid === selectMenuId) {
          selectedMenu = menu;
          selectedMenu.quantity = 1;
        }
      });
    });
  });

  const [selections, setSelections] = useState(
    selectedMenu ? [selectedMenu] : []
  );

  const navigateToMenuItem = (
    item,
    group,
    groupImage,
    contentful
  ) => {
    navigation.navigate('MenuItemTemplate', {
      payload: { item, group, groupImage },
      contentful
    });
  };

  /* console.log('Menus', menus.length); */

  const handleFilterClick = filter => {
    if (filters.includes(filter)) {
      const filteredFilter = filters.filter(
        item => item !== filter
      );
      setFilters(filteredFilter);
    } else {
      setFilters([...filters, filter]);
    }
  };

  const FilterButton = props => {
    const { current, selection, icon, setFilterSelection } =
      props;

    return (
      <Pressable
        onPress={() =>
          setFilterSelection(
            current === selection ? '' : selection
          )
        }
      >
        <VStack space={2}>
          <Center
            borderRadius="45"
            borderWidth={4}
            borderColor={
              current === selection
                ? 'brand.purple'
                : 'transparent'
            }
            backgroundColor={
              current === selection
                ? 'brand.dark'
                : useColorModeValue(
                    'brand.white',
                    'brand.lightGrayOnBlack'
                  )
            }
            shadow={3}
            p={1}
            width="57px"
            height="57px"
            mx="auto"
          >
            {icon}
          </Center>
          <Center width="90px">{selection}</Center>
        </VStack>
      </Pressable>
    );
  };

  const getCheckedStatus = menuItem => {
    return menuItem.guid === selectMenuId;
  };

  const MenuFilterButton = props => {
    const { selection, current } = props;

    return (
      <Button
        flex={1}
        borderWidth="2"
        borderColor="brand.lightgray"
        _text={{
          lineHeight: '15',
          py: 1
        }}
        onPress={() => console.log('Menu Button Pressed')}
      >
        {selection}
      </Button>
    );
  };

  const getNextTierName = () => {
    let tier = allTierData[0];
    if (user.points < allTierData[0].fields.points) {
      tier = allTierData[0];
    } else if (user.points < allTierData[1].fields.points) {
      tier = allTierData[1];
    } else if (user.points < allTierData[2].fields.points) {
      tier = allTierData[2];
    }
    return tier.fields.name.toUpperCase();
  };

  const getRemainPointsForNextTier = () => {
    let remainPoints = 0;
    if (user.points < allTierData[0].fields.points) {
      remainPoints =
        allTierData[0].fields.points - user.points;
    } else if (user.points < allTierData[1].fields.points) {
      remainPoints =
        allTierData[1].fields.points - user.points;
    } else if (user.points < allTierData[2].fields.points) {
      remainPoints =
        allTierData[2].fields.points - user.points;
    }
    return remainPoints;
  };

  useEffect(() => {
    const fetchTiers = async () => {
      let data = await getEntriesByType('RewardTier');
      let tierData = data
        .filter(item => item.fields.tag)
        .sort((a, b) => {
          if (a.fields.name < b.fields.name) {
            return -1;
          }
          if (a.fields.name > b.fields.name) {
            return 1;
          }
          return 0;
        });
      // console.log(tierData);
      setTierData(tierData);
    };
    fetchTiers();
  }, []);

  useEffect(() => {
    if (
      selectedMenu &&
      selections &&
      selections.length > 0
    ) {
      setLatestAWSPayload({
        ...latestAWSPayload,
        selections: [...selections],
        paymentMethod: latestAWSPayload.paymentMethod
      });
    }
  }, []);
  return (
    <VStack
      borderWidth={0}
      flex={1}
      pt={10}
      mt={10}
      safeArea
      space={0}
    >
      <ScrollView>
        <HStack
          justifyContent={'space-around'}
          my={2}
          px="10"
        >
          <FilterButton
            selection="View All"
            current={filterSelection}
            icon={
              <FoodIcon
                size="44"
                color={
                  filterSelection === 'View All'
                    ? 'brand.white'
                    : useColorModeValue(
                        'brand.mediumGrayOnWhite',
                        'brand.white'
                      )
                }
                vertAdj={3}
              />
            }
            setFilterSelection={setFilterSelection}
          />
          <FilterButton
            selection="Specials"
            current={filterSelection}
            icon={
              <SpecialsIcon
                size="34"
                color={
                  filterSelection === 'Specials'
                    ? 'brand.white'
                    : useColorModeValue(
                        'brand.mediumGrayOnWhite',
                        'brand.white'
                      )
                }
              />
            }
            setFilterSelection={setFilterSelection}
          />
          <FilterButton
            selection="Rewards"
            current={filterSelection}
            icon={
              <RewardsIcon
                size="34"
                color={
                  filterSelection === 'Rewards'
                    ? 'brand.white'
                    : useColorModeValue(
                        'brand.mediumGrayOnWhite',
                        'brand.white'
                      )
                }
                vertAdj={3}
              />
            }
            setFilterSelection={setFilterSelection}
          />
        </HStack>
        {filterSelection === '' && (
          <Box
            justifyContent={'flex-start'}
            flexWrap="wrap"
            display="flex"
            flexDirection="row"
            mt={8}
            px="4"
          >
            {(latestAWSPayload.diningOptionName ===
              DINE_IN ||
              !latestAWSPayload.hasOwnProperty(
                'diningOptionName'
              )) && (
              <Heading
                fontSize="18px"
                letterSpacing="6px"
                ml="8px"
                mb="10px"
              >
                BEVERAGES
              </Heading>
            )}
            {(latestAWSPayload.diningOptionName ===
              DINE_IN ||
              !latestAWSPayload.hasOwnProperty(
                'diningOptionName'
              )) &&
              filteredMenus
                .filter(menu => menu[1].name === 'Bar 19')
                .map((menu, index) => {
                  return (
                    <Pressable
                      onPress={() => {
                        navigation.navigate(
                          'FoodLineTemplate',
                          {
                            payload: menu[1],
                            contentful:
                              contentfulFoodLines.filter(
                                content =>
                                  content.fields
                                    .menuGuid ===
                                  menu[1].guid
                              )
                          }
                        );
                      }}
                      key={menu[1].guid}
                    >
                      <FoodLineContainer
                        image={menu[1].image}
                        name={menu[1].name}
                        resizeMode="cover"
                        borderRadius={8}
                      />
                    </Pressable>
                  );
                })}

            <Heading
              fontSize="18px"
              letterSpacing="6px"
              ml="8px"
              mb="10px"
              mt="24px"
            >
              FOOD
            </Heading>
            {filteredMenus
              .filter(menu => menu[1].name !== 'Bar 19')
              .map((menu, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      navigation.navigate(
                        'FoodLineTemplate',
                        {
                          payload: menu[1],
                          contentful:
                            contentfulFoodLines.filter(
                              content =>
                                content.fields.menuGuid ===
                                menu[1].guid
                            )
                        }
                      );
                    }}
                    key={menu[1].guid}
                  >
                    <FoodLineContainer
                      image={menu[1].image}
                      name={menu[1].name}
                      resizeMode="cover"
                      borderRadius={8}
                    />
                  </Pressable>
                );
              })}
          </Box>
        )}
        {(filterSelection === 'View All' ||
          filterSelection === 'Specials') && (
          <>
            <Box my="6">
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                px="2"
                mb={filters.length > 0 ? '-0.5' : '0'}
                contentContainerStyle={{
                  alignItems: 'center'
                }}
              >
                {allMenuGroupNames.map((group, index) => {
                  return (
                    <Pressable
                      onPress={() => {
                        handleFilterClick(group);
                      }}
                      key={`${group}-filterchips`}
                    >
                      <FilterChip
                        name={group}
                        active={filters.includes(group)}
                        last={
                          allMenuGroupNames.length - 1 ===
                          index
                        }
                      />
                    </Pressable>
                  );
                })}
              </ScrollView>
            </Box>

            {allMenuGroupNames.map((groupName, index) => {
              if (filters.length === 0) {
                return allMenuGroups
                  .filter(group => {
                    if (filterSelection === 'Specials') {
                      const groupLength =
                        group.menuGroups.filter(
                          finalGroup => {
                            return finalGroup.menuItems.filter(
                              item => {
                                let filteredTags = [];
                                if (
                                  filterSelection ===
                                  'Specials'
                                ) {
                                  filteredTags =
                                    item.itemTags.filter(
                                      t =>
                                        t.name === 'Special'
                                    );
                                } else {
                                  filteredTags =
                                    item.itemTags.filter(
                                      t =>
                                        t.name.indexOf(
                                          'Tier'
                                        ) > -1
                                    );
                                }
                                return filteredTags.length;
                              }
                            ).length;
                          }
                        );
                      return groupLength.length;
                    } else {
                      return true;
                    }
                  })
                  .map((group, index) => {
                    if (group.name === groupName) {
                      return (
                        <Box
                          mb={
                            allMenuGroupNames.length - 1 !==
                            index
                              ? '0'
                              : '10'
                          }
                          px="4"
                          key={`${group.guid}-unfilteredcontent`}
                        >
                          <Heading
                            fontSize="18px"
                            letterSpacing="6px"
                            ml="8px"
                            mb="10px"
                          >
                            {group.name}
                          </Heading>
                          {group.menuGroups.map(
                            (finalGroup, index) => {
                              return finalGroup.menuItems
                                .filter(item => {
                                  if (
                                    filterSelection ===
                                    'Specials'
                                  ) {
                                    let filteredTags = [];
                                    filteredTags =
                                      item.itemTags.filter(
                                        t =>
                                          t.name ===
                                          'Special'
                                      );
                                    return filteredTags.length;
                                  } else {
                                    return true;
                                  }
                                })
                                .map((item, index) => {
                                  const in_stock_status =
                                    item.inventoryStatus ===
                                    IN_STOCK_VALUE;

                                  return (
                                    <FoodItemContainer
                                      name={item.name}
                                      price={item.price}
                                      image={item.guid}
                                      in_stock={
                                        in_stock_status
                                      }
                                      groupImage={
                                        finalGroup.lineImage
                                      }
                                      contentful={contentfulFoodLines?.find(
                                        content =>
                                          content.fields
                                            .guid ===
                                          item.guid
                                      )}
                                      key={`${item.guid}-unfilteredcontent`}
                                      onPress={() =>
                                        in_stock_status
                                          ? navigateToMenuItem(
                                              item,
                                              finalGroup.guid,
                                              group.foodLineImage,
                                              contentfulFoodLines.find(
                                                content =>
                                                  content
                                                    .fields
                                                    .guid ===
                                                  item.guid
                                              )
                                            )
                                          : false
                                      }
                                      imageRight={
                                        filterSelection ===
                                        'Rewards'
                                      }
                                      isReward={
                                        filterSelection ===
                                        'Rewards'
                                      }
                                      checked={getCheckedStatus(
                                        item
                                      )}
                                      onCheck={checked => {
                                        if (checked) {
                                          item.quantity = 1;
                                          selections.push(
                                            item
                                          );
                                        } else {
                                          const selectionIndex =
                                            selections.findIndex(
                                              sel =>
                                                sel.guid ===
                                                item.guid
                                            );
                                          if (
                                            selectionIndex >
                                            -1
                                          ) {
                                            selections.splice(
                                              selectionIndex,
                                              1
                                            );
                                          }
                                        }
                                        setLatestAWSPayload(
                                          {
                                            ...latestAWSPayload,
                                            selections: [
                                              ...selections
                                            ],
                                            paymentMethod:
                                              latestAWSPayload.paymentMethod
                                          }
                                        );
                                        setSelections([
                                          ...selections
                                        ]);
                                      }}
                                    />
                                  );
                                });
                            }
                          )}
                        </Box>
                      );
                    }
                  });
              } else if (filters.includes(groupName)) {
                return allMenuGroups
                  .filter(group => {
                    if (filterSelection === 'Specials') {
                      const groupLength =
                        group.menuGroups.filter(
                          finalGroup => {
                            return finalGroup.menuItems.filter(
                              item => {
                                let filteredTags = [];
                                if (
                                  filterSelection ===
                                  'Specials'
                                ) {
                                  filteredTags =
                                    item.itemTags.filter(
                                      t =>
                                        t.name === 'Special'
                                    );
                                } else {
                                  filteredTags =
                                    item.itemTags.filter(
                                      t =>
                                        t.name.indexOf(
                                          'Tier'
                                        ) > -1
                                    );
                                }
                                return filteredTags.length;
                              }
                            ).length;
                          }
                        );
                      return groupLength.length;
                    } else {
                      return true;
                    }
                  })
                  .map((group, index) => {
                    if (group.name === groupName) {
                      return (
                        <Box
                          mb={
                            allMenuGroupNames.length - 1 !==
                            index
                              ? '0'
                              : '10'
                          }
                          px="4"
                          key={`${group.guid}-unfilteredcontent`}
                        >
                          <Heading
                            fontSize="18px"
                            letterSpacing="6px"
                            ml="8px"
                            mb="10px"
                          >
                            {group.name}
                          </Heading>
                          {group.menuGroups.map(
                            (finalGroup, index) => {
                              return finalGroup.menuItems
                                .filter(item => {
                                  if (
                                    filterSelection ===
                                    'Specials'
                                  ) {
                                    let filteredTags = [];
                                    filteredTags =
                                      item.itemTags.filter(
                                        t =>
                                          t.name ===
                                          'Special'
                                      );
                                    return filteredTags.length;
                                  } else {
                                    return true;
                                  }
                                })
                                .map(item => {
                                  const in_stock_status =
                                    item.inventoryStatus ===
                                    IN_STOCK_VALUE;

                                  // View All with Filter Chip

                                  return (
                                    <FoodItemContainer
                                      name={item.name}
                                      price={item.price}
                                      image={item.guid}
                                      in_stock={
                                        in_stock_status
                                      }
                                      groupImage={
                                        finalGroup.lineImage
                                      }
                                      contentful={contentfulFoodLines?.find(
                                        content =>
                                          content.fields
                                            .guid ===
                                          item.guid
                                      )}
                                      key={`${item.guid}-unfilteredcontent`}
                                      onPress={() =>
                                        navigateToMenuItem(
                                          item,
                                          group.guid,
                                          group.foodLineImage,
                                          contentfulFoodLines.filter(
                                            content =>
                                              content.fields
                                                .menuGuid ===
                                              item.guid
                                          )
                                        )
                                      }
                                      imageRight={
                                        filterSelection ===
                                        'Rewards'
                                      }
                                      isReward={
                                        filterSelection ===
                                        'Rewards'
                                      }
                                      checked={getCheckedStatus(
                                        item
                                      )}
                                      onCheck={checked => {
                                        if (checked) {
                                          item.quantity = 1;
                                          selections.push(
                                            item
                                          );
                                        } else {
                                          const selectionIndex =
                                            selections.findIndex(
                                              sel =>
                                                sel.guid ===
                                                item.guid
                                            );
                                          if (
                                            selectionIndex >
                                            -1
                                          ) {
                                            selections.splice(
                                              selectionIndex,
                                              1
                                            );
                                          }
                                        }
                                        setLatestAWSPayload(
                                          {
                                            ...latestAWSPayload,
                                            selections: [
                                              ...selections
                                            ],
                                            paymentMethod:
                                              latestAWSPayload.paymentMethod
                                          }
                                        );
                                        setSelections([
                                          ...selections
                                        ]);
                                      }}
                                    />
                                  );
                                });
                            }
                          )}
                        </Box>
                      );
                    }
                  });
              }
            })}
          </>
        )}
        {filterSelection === 'Rewards' && (
          <>
            <Box my="8" px="8">
              <Box
                justifyContent="center"
                alignItems="center"
                mb={2}
              >
                <Text
                  fontWeight="bold"
                  pt="2"
                  letterSpacing="1px"
                >
                  {getRemainPointsForNextTier()} POINTS LEFT
                  TO UNLOCK {getNextTierName()}
                </Text>
              </Box>
              <Box position="relative" width="100%">
                <Progress
                  bg="#555756"
                  _filledTrack={{ bg: '#2EB192' }}
                  value={
                    (user.points * 100) /
                    allTierData[2].fields.points
                  }
                  mx={4}
                />
                <Box
                  position="absolute"
                  left={
                    (allTierData[0].fields.points * 100) /
                      allTierData[2].fields.points -
                    7 +
                    '%'
                  }
                  top="-5px"
                  bg={
                    user.points >=
                    allTierData[0].fields.points
                      ? '#2EB192'
                      : '#FCF9FF'
                  }
                  width="4"
                  height="4"
                  borderRadius="20px"
                  padding="2px"
                >
                  <Box
                    borderColor={
                      user.points >=
                      allTierData[0].fields.points
                        ? '#FFF'
                        : 'purple.500'
                    }
                    borderWidth="2px"
                    width="100%"
                    height="100%"
                    borderRadius="20px"
                  ></Box>
                </Box>
                <Box
                  position="absolute"
                  left={
                    (allTierData[1].fields.points * 100) /
                      allTierData[2].fields.points -
                    7 +
                    '%'
                  }
                  top="-5px"
                  bg={
                    user.points >=
                    allTierData[1].fields.points
                      ? '#2EB192'
                      : '#FCF9FF'
                  }
                  width="4"
                  height="4"
                  borderRadius="20px"
                  padding="2px"
                >
                  <Box
                    borderColor={
                      user.points >=
                      allTierData[1].fields.points
                        ? '#FFF'
                        : 'purple.500'
                    }
                    borderWidth="2px"
                    width="100%"
                    height="100%"
                    borderRadius="20px"
                  ></Box>
                </Box>
                <Box
                  position="absolute"
                  left="93%"
                  top="-5px"
                  bg={
                    user.points >=
                    allTierData[2].fields.points
                      ? '#2EB192'
                      : '#FCF9FF'
                  }
                  width="4"
                  height="4"
                  borderRadius="20px"
                  padding="2px"
                >
                  <Box
                    borderColor={
                      user.points >=
                      allTierData[2].fields.points
                        ? '#FFF'
                        : 'purple.500'
                    }
                    borderWidth="2px"
                    width="100%"
                    height="100%"
                    borderRadius="20px"
                  ></Box>
                </Box>
              </Box>
            </Box>

            <TabbedPanel
              tabs={[
                {
                  title: 'TIER 1',
                  content: (
                    <View mt={4}>
                      {allMenuGroupNames.map(
                        (groupName, index) => {
                          return allMenuGroups
                            .filter(group => {
                              if (
                                filterSelection ===
                                'Rewards'
                              ) {
                                const groupLength =
                                  group.menuGroups.filter(
                                    finalGroup => {
                                      return finalGroup.menuItems.filter(
                                        item => {
                                          let filteredTags =
                                            [];
                                          filteredTags =
                                            item.itemTags.filter(
                                              t =>
                                                t.name.indexOf(
                                                  'Tier1'
                                                ) > -1
                                            );
                                          return filteredTags.length;
                                        }
                                      ).length;
                                    }
                                  );
                                return groupLength.length;
                              } else {
                                return true;
                              }
                            })
                            .map((group, index) => {
                              if (
                                group.name === groupName
                              ) {
                                return (
                                  <Box
                                    mb={
                                      allMenuGroupNames.length -
                                        1 !==
                                      index
                                        ? '0'
                                        : '10'
                                    }
                                    px="4"
                                    key={`${group.guid}-unfilteredcontent`}
                                  >
                                    {group.menuGroups.map(
                                      (
                                        finalGroup,
                                        index
                                      ) => {
                                        return finalGroup.menuItems
                                          .filter(item => {
                                            let filteredTags =
                                              [];
                                            filteredTags =
                                              item.itemTags.filter(
                                                t =>
                                                  t.name.indexOf(
                                                    'Tier1'
                                                  ) > -1
                                              );
                                            return filteredTags.length;
                                          })
                                          .map(item => {
                                            const in_stock_status =
                                              item.inventoryStatus ===
                                              IN_STOCK_VALUE;

                                            // Tier 1

                                            return (
                                              <FoodItemContainer
                                                name={
                                                  item.name
                                                }
                                                price={
                                                  item.price
                                                }
                                                image={
                                                  item.guid
                                                }
                                                in_stock={
                                                  in_stock_status
                                                }
                                                groupImage={
                                                  finalGroup.lineImage
                                                }
                                                contentful={contentfulFoodLines?.find(
                                                  content =>
                                                    content
                                                      .fields
                                                      .guid ===
                                                    item.guid
                                                )}
                                                key={`${item.guid}-unfilteredcontent`}
                                                onPress={() =>
                                                  navigateToMenuItem(
                                                    item,
                                                    finalGroup.guid,
                                                    group.foodLineImage,
                                                    contentfulFoodLines.filter(
                                                      content =>
                                                        content
                                                          .fields
                                                          .menuGuid ===
                                                        item.guid
                                                    )
                                                  )
                                                }
                                                imageRight={
                                                  filterSelection ===
                                                  'Rewards'
                                                }
                                                isReward={
                                                  filterSelection ===
                                                  'Rewards'
                                                }
                                                checked={getCheckedStatus(
                                                  item
                                                )}
                                                onCheck={checked => {
                                                  if (
                                                    checked
                                                  ) {
                                                    item.quantity = 1;
                                                    selections.push(
                                                      item
                                                    );
                                                  } else {
                                                    const selectionIndex =
                                                      selections.findIndex(
                                                        sel =>
                                                          sel.guid ===
                                                          item.guid
                                                      );
                                                    if (
                                                      selectionIndex >
                                                      -1
                                                    ) {
                                                      selections.splice(
                                                        selectionIndex,
                                                        1
                                                      );
                                                    }
                                                  }
                                                  setLatestAWSPayload(
                                                    {
                                                      ...latestAWSPayload,
                                                      selections:
                                                        [
                                                          ...selections
                                                        ],
                                                      paymentMethod:
                                                        latestAWSPayload.paymentMethod
                                                    }
                                                  );
                                                  setSelections(
                                                    [
                                                      ...selections
                                                    ]
                                                  );
                                                }}
                                              />
                                            );
                                          });
                                      }
                                    )}
                                  </Box>
                                );
                              }
                            });
                        }
                      )}
                    </View>
                  )
                },
                {
                  title: 'TIER 2',
                  content: (
                    <View mt={4}>
                      {allMenuGroupNames.map(
                        (groupName, index) => {
                          return allMenuGroups
                            .filter(group => {
                              if (
                                filterSelection ===
                                'Rewards'
                              ) {
                                const groupLength =
                                  group.menuGroups.filter(
                                    finalGroup => {
                                      return finalGroup.menuItems.filter(
                                        item => {
                                          let filteredTags =
                                            [];
                                          filteredTags =
                                            item.itemTags.filter(
                                              t =>
                                                t.name.indexOf(
                                                  'Tier2'
                                                ) > -1
                                            );
                                          return filteredTags.length;
                                        }
                                      ).length;
                                    }
                                  );
                                return groupLength.length;
                              } else {
                                return true;
                              }
                            })
                            .map((group, index) => {
                              if (
                                group.name === groupName
                              ) {
                                return (
                                  <Box
                                    mb={
                                      allMenuGroupNames.length -
                                        1 !==
                                      index
                                        ? '0'
                                        : '10'
                                    }
                                    px="4"
                                    key={`${group.guid}-unfilteredcontent`}
                                  >
                                    {group.menuGroups.map(
                                      (
                                        finalGroup,
                                        index
                                      ) => {
                                        return finalGroup.menuItems
                                          .filter(item => {
                                            let filteredTags =
                                              [];
                                            filteredTags =
                                              item.itemTags.filter(
                                                t =>
                                                  t.name.indexOf(
                                                    'Tier2'
                                                  ) > -1
                                              );
                                            return filteredTags.length;
                                          })
                                          .map(item => {
                                            const in_stock_status =
                                              item.inventoryStatus ===
                                              IN_STOCK_VALUE;

                                            // Tier 2

                                            return (
                                              <FoodItemContainer
                                                name={
                                                  item.name
                                                }
                                                price={
                                                  item.price
                                                }
                                                image={
                                                  item.guid
                                                }
                                                in_stock={
                                                  in_stock_status
                                                }
                                                groupImage={
                                                  finalGroup.lineImage
                                                }
                                                contentful={contentfulFoodLines?.find(
                                                  content =>
                                                    content
                                                      .fields
                                                      .guid ===
                                                    item.guid
                                                )}
                                                key={`${item.guid}-unfilteredcontent`}
                                                onPress={() =>
                                                  navigateToMenuItem(
                                                    item,
                                                    finalGroup.guid,
                                                    group.foodLineImage,
                                                    contentfulFoodLines.filter(
                                                      content =>
                                                        content
                                                          .fields
                                                          .menuGuid ===
                                                        item.guid
                                                    )
                                                  )
                                                }
                                                imageRight={
                                                  filterSelection ===
                                                  'Rewards'
                                                }
                                                isReward={
                                                  filterSelection ===
                                                  'Rewards'
                                                }
                                                checked={getCheckedStatus(
                                                  item
                                                )}
                                                onCheck={checked => {
                                                  if (
                                                    checked
                                                  ) {
                                                    item.quantity = 1;
                                                    selections.push(
                                                      item
                                                    );
                                                  } else {
                                                    const selectionIndex =
                                                      selections.findIndex(
                                                        sel =>
                                                          sel.guid ===
                                                          item.guid
                                                      );
                                                    if (
                                                      selectionIndex >
                                                      -1
                                                    ) {
                                                      selections.splice(
                                                        selectionIndex,
                                                        1
                                                      );
                                                    }
                                                  }
                                                  setLatestAWSPayload(
                                                    {
                                                      ...latestAWSPayload,
                                                      selections:
                                                        [
                                                          ...selections
                                                        ],
                                                      paymentMethod:
                                                        latestAWSPayload.paymentMethod
                                                    }
                                                  );
                                                  setSelections(
                                                    [
                                                      ...selections
                                                    ]
                                                  );
                                                }}
                                              />
                                            );
                                          });
                                      }
                                    )}
                                  </Box>
                                );
                              }
                            });
                        }
                      )}
                    </View>
                  )
                },
                {
                  title: 'TIER 3',
                  content: (
                    <View mt={4}>
                      {allMenuGroupNames.map(
                        (groupName, index) => {
                          return allMenuGroups
                            .filter(group => {
                              if (
                                filterSelection ===
                                'Rewards'
                              ) {
                                const groupLength =
                                  group.menuGroups.filter(
                                    finalGroup => {
                                      return finalGroup.menuItems.filter(
                                        item => {
                                          let filteredTags =
                                            [];
                                          filteredTags =
                                            item.itemTags.filter(
                                              t =>
                                                t.name.indexOf(
                                                  'Tier3'
                                                ) > -1
                                            );
                                          return filteredTags.length;
                                        }
                                      ).length;
                                    }
                                  );
                                return groupLength.length;
                              } else {
                                return true;
                              }
                            })
                            .map((group, index) => {
                              if (
                                group.name === groupName
                              ) {
                                return (
                                  <Box
                                    mb={
                                      allMenuGroupNames.length -
                                        1 !==
                                      index
                                        ? '0'
                                        : '10'
                                    }
                                    px="4"
                                    key={`${group.guid}-unfilteredcontent`}
                                  >
                                    {group.menuGroups.map(
                                      (
                                        finalGroup,
                                        index
                                      ) => {
                                        return finalGroup.menuItems
                                          .filter(item => {
                                            let filteredTags =
                                              [];
                                            filteredTags =
                                              item.itemTags.filter(
                                                t =>
                                                  t.name.indexOf(
                                                    'Tier3'
                                                  ) > -1
                                              );
                                            return filteredTags.length;
                                          })
                                          .map(item => {
                                            const in_stock_status =
                                              item.inventoryStatus ===
                                              IN_STOCK_VALUE;

                                            // Tier 3

                                            return (
                                              <FoodItemContainer
                                                name={
                                                  item.name
                                                }
                                                price={
                                                  item.price
                                                }
                                                image={
                                                  item.guid
                                                }
                                                in_stock={
                                                  in_stock_status
                                                }
                                                groupImage={
                                                  finalGroup.lineImage
                                                }
                                                contentful={contentfulFoodLines?.find(
                                                  content =>
                                                    content
                                                      .fields
                                                      .guid ===
                                                    item.guid
                                                )}
                                                key={`${item.guid}-unfilteredcontent`}
                                                onPress={() =>
                                                  navigateToMenuItem(
                                                    item,
                                                    finalGroup.guid,
                                                    group.foodLineImage,
                                                    contentfulFoodLines.filter(
                                                      content =>
                                                        content
                                                          .fields
                                                          .menuGuid ===
                                                        item.guid
                                                    )
                                                  )
                                                }
                                                imageRight={
                                                  filterSelection ===
                                                  'Rewards'
                                                }
                                                isReward={
                                                  filterSelection ===
                                                  'Rewards'
                                                }
                                                checked={getCheckedStatus(
                                                  item
                                                )}
                                                onCheck={checked => {
                                                  if (
                                                    checked
                                                  ) {
                                                    item.quantity = 1;
                                                    selections.push(
                                                      item
                                                    );
                                                  } else {
                                                    const selectionIndex =
                                                      selections.findIndex(
                                                        sel =>
                                                          sel.guid ===
                                                          item.guid
                                                      );
                                                    if (
                                                      selectionIndex >
                                                      -1
                                                    ) {
                                                      selections.splice(
                                                        selectionIndex,
                                                        1
                                                      );
                                                    }
                                                  }
                                                  setLatestAWSPayload(
                                                    {
                                                      ...latestAWSPayload,
                                                      selections:
                                                        [
                                                          ...selections
                                                        ],
                                                      paymentMethod:
                                                        latestAWSPayload.paymentMethod
                                                    }
                                                  );
                                                  setSelections(
                                                    [
                                                      ...selections
                                                    ]
                                                  );
                                                }}
                                              />
                                            );
                                          });
                                      }
                                    )}
                                  </Box>
                                );
                              }
                            });
                        }
                      )}
                    </View>
                  )
                }
              ]}
            />
          </>
        )}
      </ScrollView>
      <TabFAB
        navigate={target => navigation.navigate(target)}
      />
    </VStack>
  );
};

export default FoodMenuHome;
