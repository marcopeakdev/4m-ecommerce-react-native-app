import React, {
  useContext,
  useRef,
  useState,
  useEffect
} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';
import {
  Box,
  ChevronLeftIcon,
  Heading,
  ScrollView
} from 'native-base';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import ImageHeaderScrollView, {
  TriggeringView
} from 'react-native-image-header-scroll-view';
import FoodItemContainer from '../../components/FoodItemContainer';
import FilterChip from '../../components/FilterChip';
import TabFAB from '../../components/TabFAB';
import { useFocusEffect } from '@react-navigation/native';
import TabbedPanel from '../../components/TabbedPanel';
import { AppContext } from '../../helpers/AppContext';
import * as Animatable from 'react-native-animatable';
import {
  getEntriesByType,
  getMenuEntries
} from '../../helpers/contentfulApiCalls';
import TimeoutIcon from '../../../assets/icons/Timeout';
import { IN_STOCK_VALUE } from '../../constants/food';
import { ToastContext } from '../../helpers/ToastContext';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

const FoodLineTemplate = ({ navigation, route }, props) => {
  const { setBottomTabHide } = useContext(AppContext);
  const { latestAWSPayload } = useContext(ToastContext);
  const [marginTop, setMarginTop] = useState(4);

  // Contentful
  const [contentfulFoodLines, setContentfulFoodLines] =
    useState(null);
  const [contentfulMenu, setContentfulMenu] = useState({});

  useFocusEffect(() => {
    setBottomTabHide(true);

    return () => setBottomTabHide(false);
  });

  const { payload, contentful, previous } = route.params;
  const { menuGroups } = payload;

  const { description, hasBanner, bannerText } =
    contentful[0]?.fields ?? {};

  const [filters, setFilters] = useState([]);

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

  const foodLineData = {
    payload,
    contentful
  };

  const navigateToMenuItem = (item, group) => {
    navigation.navigate('MenuItemTemplate', {
      payload: { item, group, groupImage: payload.image },
      contentful: contentfulFoodLines.find(
        content => content.fields.guid === item.guid
      ),
      foodLineData
    });
  };

  useEffect(async () => {
    try {
      const entries = await getEntriesByType('foodLine');

      setContentfulFoodLines(entries);
    } catch (error) {
      console.log('Error getting Food Lines');
      console.log(error);
    }
  }, []);

  const navTitleView = useRef(null);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageHeaderScrollView
        disableHeaderGrow
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        renderHeader={() => (
          <Image
            source={{
              uri: payload.image
            }}
            style={styles.image}
          />
        )}
        renderForeground={() => (
          <View style={styles.titleContainer}>
            <Pressable
              style={{
                position: 'absolute',
                top: 80,
                left: 30
              }}
              onPress={() => {
                previous === 'Home'
                  ? navigation.navigate('Home')
                  : navigation.goBack();
              }}
            >
              <ChevronLeftIcon size="lg" color="white" />
            </Pressable>
            <Text style={styles.imageTitle}>
              {payload.name}
            </Text>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View
            style={styles.navTitleView}
            ref={navTitleView}
          >
            <Text style={styles.imageTitle}>
              {payload.name}
            </Text>
          </Animatable.View>
        )}
      >
        <TriggeringView
          style={{ marginTop: 20 }}
          onHide={() => {
            // setMarginTop(12)
            navTitleView.current.fadeInUp(200);
          }}
          onDisplay={() => {
            // setMarginTop(4)
            navTitleView.current.fadeOut(100);
          }}
        ></TriggeringView>

        <TabbedPanel
          tabs={[
            {
              title: 'Menu',
              content: (
                <>
                  {hasBanner && bannerText && (
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: 20,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        backgroundColor: '#ABABAB'
                      }}
                    >
                      <TimeoutIcon />
                      <Text
                        style={{
                          color: '#202020',
                          padding: 18
                        }}
                      >
                        {bannerText}
                      </Text>
                    </View>
                  )}
                  <Box mt={marginTop} mb="6">
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      px="2"
                      mb={filters.length > 0 ? '-0.5' : '0'}
                      contentContainerStyle={{
                        alignItems: 'center'
                      }}
                    >
                      {menuGroups.map((group, index) => {
                        return (
                          <Pressable
                            onPress={() => {
                              handleFilterClick(group.name);
                            }}
                            key={`${group.guid}-filterchips`}
                          >
                            <FilterChip
                              name={group.name}
                              active={filters.includes(
                                group.name
                              )}
                              last={
                                menuGroups.length - 1 ===
                                index
                              }
                            />
                          </Pressable>
                        );
                      })}
                    </ScrollView>
                  </Box>

                  <ScrollView
                    flex="1"
                    px="4"
                    pb="12"
                    mb="12"
                    borderWidth="0"
                  >
                    {menuGroups.map((group, index) => {
                      if (filters.length === 0) {
                        return (
                          <Box
                            mb={
                              menuGroups.length - 1 !==
                              index
                                ? '0'
                                : '10'
                            }
                            key={`${group.guid}-unfilteredcontent`}
                          >
                            <Heading
                              variant="captionTitle"
                              fontSize="md"
                              pb="4"
                              lineHeight="15"
                            >
                              {[...group.name].map(
                                (char, index) => (
                                  <Text
                                    key={`${group.name}-${char}-${index}-caption-title`}
                                  >
                                    {char + ' '}
                                  </Text>
                                )
                              )}
                            </Heading>
                            {group.menuItems.map(item => {
                              const in_stock_status =
                                item.inventoryStatus ===
                                IN_STOCK_VALUE;

                              const contentfulItem =
                                contentfulFoodLines?.find(
                                  content =>
                                    content.fields.guid ===
                                    item.guid
                                );

                              return (
                                <FoodItemContainer
                                  name={item.name}
                                  price={item.price}
                                  image={null}
                                  environmentImage={
                                    payload.image
                                  }
                                  contentful={
                                    contentfulItem
                                  }
                                  in_stock={in_stock_status}
                                  key={`${item.guid}-unfilteredcontent`}
                                  onPress={() =>
                                    navigateToMenuItem(
                                      item,
                                      group.guid
                                    )
                                  }
                                />
                              );
                            })}
                          </Box>
                        );
                      } else if (
                        filters.includes(group.name)
                      ) {
                        return (
                          <Box
                            mb={
                              menuGroups.length - 1 !==
                              index
                                ? '12'
                                : '12'
                            }
                            key={`${group.guid}-filteredcontent`}
                          >
                            <Heading
                              variant="captionTitle"
                              fontSize="md"
                            >
                              {group.name}
                            </Heading>
                            {group.menuItems.map(item => {
                              const in_stock_status =
                                item.inventoryStatus ===
                                IN_STOCK_VALUE;
                              return (
                                <FoodItemContainer
                                  name={item.name}
                                  price={item.price}
                                  image={null}
                                  environmentImage={
                                    payload.image
                                  }
                                  in_stock={in_stock_status}
                                  key={`${item.guid}-filteredcontent`}
                                  onPress={() =>
                                    navigateToMenuItem(
                                      item,
                                      group.guid
                                    )
                                  }
                                />
                              );
                            })}
                          </Box>
                        );
                      }
                    })}
                  </ScrollView>
                </>
              )
            },
            {
              title: 'About',
              content: (
                <Box h="100%" pb={10}>
                  {hasBanner && bannerText && (
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: 20,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        backgroundColor: '#ABABAB'
                      }}
                    >
                      <TimeoutIcon />
                      <Text
                        style={{
                          color: '#202020',
                          padding: 18
                        }}
                      >
                        {bannerText}
                      </Text>
                    </View>
                  )}
                  <ScrollView px={4} mt="4">
                    <Text style={styles.description}>
                      {description}
                    </Text>
                  </ScrollView>
                </Box>
              )
            }
          ]}
        />
      </ImageHeaderScrollView>
      {latestAWSPayload && (
        <TabFAB
          navigate={target => navigation.navigate(target)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover'
  },
  title: {
    fontSize: 20
  },
  name: {
    fontWeight: 'bold'
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify'
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15
  },
  category: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10
  },
  titleContainer: {
    flex: 1,
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  imageTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 100,
    padding: 30,
    paddingLeft: 40,
    backgroundColor: 'transparent',
    fontSize: 24,
    textTransform: 'uppercase'
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? 20 : 5,
    opacity: 0
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent'
  },
  sectionLarge: {
    minHeight: 300
  },
  description: {
    fontWeight: '200',
    fontSize: 14
  }
});

export default FoodLineTemplate;

// import {
//   Box,
//   Heading,
//   Button,
//   Text,
//   ScrollView,
//   VStack,
//   FlatList,
//   HStack,
//   Image,
//   useColorModeValue,
//   View
// } from 'native-base';
// import React, {
//   useState,
//   useContext,
//   useEffect,
//   useRef
// } from 'react';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
// import FoodItemContainer from '../../components/FoodItemContainer';
// import FilterChip from '../../components/FilterChip';
// import TabFAB from '../../components/TabFAB';
// import { useFocusEffect } from '@react-navigation/native';
// import { AppContext } from '../../helpers/AppContext';
// import TabbedPanel from '../../components/TabbedPanel';
// import Header from '../../components/Food/Header';

// const FoodLineTemplate = ({ navigation, route }, props) => {
//   const { setBottomTabHide } = useContext(AppContext);

//   useFocusEffect(() => {
//     setBottomTabHide(true);

//     return () => setBottomTabHide(false);
//   });

//   const { payload, contentful } = route.params;
//   const { menuGroups } = payload;
//   console.log(menuGroups)

//   const { description } = contentful[0].fields;

//   const [filters, setFilters] = useState([]);

//   const handleFilterClick = filter => {
//     if (filters.includes(filter)) {
//       const filteredFilter = filters.filter(
//         item => item !== filter
//       );
//       setFilters(filteredFilter);
//     } else {
//       setFilters([...filters, filter]);
//     }
//   };

//   const navigateToMenuItem = (item, group) => {
//     navigation.navigate('MenuItemTemplate', {
//       payload: { item, group }
//     });
//   };

//   const [heightImage, setHeightImage] = useState('64');

//   const handleScroll = event => {
//     event.nativeEvent.contentOffset.y > '100'
//       ? setHeightImage('32')
//       : setHeightImage('64');
//   };

//   return (
//     <View
//       // There is a back button here but its hidden because its color is black
//       borderWidth={0}
//       flex={1}
//     >
//       {/* Header */}
//       <Header />

//       <TabbedPanel
//         tabs={[
//           {
//             title: 'Menu',
//             content: (
//               <>
//                 <Box mt="4" mb="6">
//                   <ScrollView
//                     horizontal={true}
//                     showsHorizontalScrollIndicator={false}
//                     px="2"
//                     mb={filters.length > 0 ? '-0.5' : '0'}
//                     contentContainerStyle={{
//                       alignItems: 'center'
//                     }}
//                   >
//                     {menuGroups.map((group, index) => {
//                       return (
//                         <Pressable
//                           onPress={() => {
//                             handleFilterClick(group.name);
//                           }}
//                           key={`${group.guid}-filterchips`}
//                         >
//                           <FilterChip
//                             name={group.name}
//                             active={filters.includes(
//                               group.name
//                             )}
//                             last={
//                               menuGroups.length - 1 ===
//                               index
//                             }
//                           />
//                         </Pressable>
//                       );
//                     })}
//                   </ScrollView>
//                 </Box>

//                 <ScrollView
//                   flex="1"
//                   px="4"
//                   borderWidth="0"
//                 // onScroll={handleScroll}
//                 // scrollEventThrottle="1"
//                 >
//                   {menuGroups.map((group, index) => {
//                     if (filters.length === 0) {
//                       return (
//                         <Box
//                           mb={
//                             menuGroups.length - 1 !== index
//                               ? '0'
//                               : '10'
//                           }
//                           key={`${group.guid}-unfilteredcontent`}
//                         >
//                           <Heading
//                             variant="captionTitle"
//                             fontSize="md"
//                             pb="4"
//                             lineHeight="15"
//                           >
//                             {[...group.name].map(char => (
//                               <Text>{char + ' '}</Text>
//                             ))}
//                           </Heading>
//                           {group.menuItems.map(item => {
//                             return (
//                               <FoodItemContainer
//                                 name={item.name}
//                                 price={item.price}
//                                 image={item.image}
//                                 key={`${item.guid}-unfilteredcontent`}
//                                 onPress={() =>
//                                   navigateToMenuItem(
//                                     item,
//                                     group.guid
//                                   )
//                                 }
//                               />
//                             );
//                           })}
//                         </Box>
//                       );
//                     } else if (
//                       filters.includes(group.name)
//                     ) {
//                       return (
//                         <Box
//                           mb={
//                             menuGroups.length - 1 !== index
//                               ? '0'
//                               : '10'
//                           }
//                           key={`${group.guid}-filteredcontent`}
//                         >
//                           <Heading
//                             variant="captionTitle"
//                             fontSize="md"
//                           >
//                             {group.name}
//                           </Heading>
//                           {group.menuItems.map(item => {
//                             return (
//                               <FoodItemContainer
//                                 name={item.name}
//                                 price={item.price}
//                                 image={item.image}
//                                 key={`${item.guid}-filteredcontent`}
//                               />
//                             );
//                           })}
//                         </Box>
//                       );
//                     }
//                   })}
//                 </ScrollView>
//               </>
//             )
//           },
//           {
//             title: 'About',
//             content: (
//               <Box h="100%" pb={10} mt="4">
//                 <ScrollView px={4}>
//                   <Text
//                     color="brand.dark"
//                     fontWeight={'200'}
//                     letterSpacing="xl"
//                   >
//                     The newest food concept from Ann
//                     Arbor-based Chef Thad Gillies, Venue
//                     Brasserie is French cooking showcasing
//                     rustic dishes that let the beautiful
//                     flavors speak for themselves. Chef Thad
//                     has curated a Provincial French menu
//                     that pulls old favorites from his
//                     original Ann Arbor restaurant Logan and
//                     introduces new dishes that present
//                     classic ingredients at their best. From
//                     pastoral steak frites to delicate salmon
//                     on ratatouille to melt-in-your-mouth
//                     porchetta… Brasserie will leave you
//                     delighted and full. C’est bon.
//                   </Text>
//                 </ScrollView>
//               </Box>
//             )
//           }
//         ]}
//       />

//       <TabFAB
//         navigate={target => navigation.navigate(target)}
//       />
//     </View>
//   );
// };

// export default FoodLineTemplate;
