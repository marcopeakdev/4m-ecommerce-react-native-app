import React, { useEffect, useState, useContext } from 'react';
import {
  VStack,
  Box,
  ScrollView,
  View,
  Avatar,
  Text,
  Progress,
  Spinner,
} from 'native-base';
import TabbedPanel from '../../components/TabbedPanel';
import UserAvatar from '../../../assets/avatars/annie-avatar.png';
import RewardItemContainer from '../../components/RewardItemContainer';
import { getEntriesByType, getEntryById } from '../../helpers/contentfulApiCalls';
import { ToastContext } from '../../helpers/ToastContext';

const ProfilePointScreen = ({ navigation, route }, props) => {
  const [isFetching, setFetching] = useState(false);
  const [allTierData, setTierData] = useState([]);
  const [content, setContentfulEntry] = useState('');

  const { user } = route.params;

  const {
    menus,
  } = useContext(ToastContext);

  useEffect(() => {
    const fetchTiers = async () => {
      setFetching(true);
      let data = await getEntriesByType('RewardTier');
      let tierData = data.filter(item => item.fields.tag).sort((a, b) => {
        if (a.fields.name < b.fields.name) {
          return -1;
        }
        if (a.fields.name > b.fields.name) {
          return 1
        }
        return 0;
      });
      console.log(tierData);
      setTierData(tierData)
      setFetching(false);
    };
    fetchTiers();
  }, []);

  useEffect(() => {
    const fetchContentful = async () => {
      const res = await getEntryById('2kNAbvhlirnYQ18MabBYcm');
      if (res && res.data) {
        setContentfulEntry(res.data.details.content[0].content[0].value);
      }
    }
    fetchContentful();
  }, []);

  const allMenuGroupNames = [];
  const allMenuGroups = [];

  menus?.forEach((menu, index) => {
    const { menuGroups, name } = menu[1];

    menuGroups.forEach(group => {
      if (!allMenuGroupNames.includes(group.name)) {
        allMenuGroupNames.push(group.name);

        allMenuGroups.push({
          name: group.name,
          foodLineImage: menu[1].image,
          lineName: name,
          menuGroups: [group]
        });
      } else {
        allMenuGroups[
          allMenuGroupNames.indexOf(group.name)
        ].menuGroups.push(group);
      }
    });
  });

  const getNextTierName = () => {
    let tier = allTierData[0];
    if (user.points < allTierData[0].fields.points) {
      tier = allTierData[0];
    } else if (user.points < allTierData[1].fields.points) {
      tier = allTierData[1];
    } else if (user.points < allTierData[2].fields.points) {
      tier = allTierData[2];
    }
    return tier.fields.name.toLowerCase();
  }

  const getRemainPointsForNextTier = () => {
    let remainPoints = 0;
    if (user.points < allTierData[0].fields.points) {
      remainPoints = allTierData[0].fields.points - user.points;
    } else if (user.points < allTierData[1].fields.points) {
      remainPoints = allTierData[1].fields.points - user.points;
    } else if (user.points < allTierData[2].fields.points) {
      remainPoints = allTierData[2].fields.points - user.points;
    }
    return remainPoints;
  }

  if (!allTierData.length) {
    return <VStack space={4} bgColor="white">
      <View justifyContent="center" alignItems="center" height="100%">
        <Spinner />
      </View>
    </VStack>;
  }

  return (
    <VStack space={4} mt={10} bgColor="white">
      <ScrollView height="100%" mt="10">
        <View justifyContent="center" alignItems="center" mb={2} mt={10}>
          <Text fontSize="20.25px" lineHeight="17.39px" fontWeight="400" pt="2" letterSpacing="1px">YOU HAVE {user.points} POINTS</Text>
          <Text fontWeight="400" pt="2" letterSpacing="1px">{getRemainPointsForNextTier()} points left to unlock {getNextTierName()} rewards</Text>

          <Box position="relative" width="100%" px="10" my="4">
            <Progress bg="#555756" _filledTrack={{ bg: "#2EB192" }} value={user.points * 100 / allTierData[2].fields.points} mx={4} />
            <Box position="absolute" left={allTierData[0].fields.points * 100 / allTierData[2].fields.points + 5 + '%'} top="-5px" bg="#FCF9FF" width="4" height="4" borderRadius="20px" padding="2px">
              <Box bg="#2EB192" borderColor="#fff" borderWidth="1px" width="100%" height="100%" borderRadius="20px"></Box>
            </Box>
            <Box position="absolute" left={allTierData[1].fields.points * 100 / allTierData[2].fields.points + 5 + '%'} top="-5px" bg="#FCF9FF" width="4" height="4" borderRadius="20px" padding="2px">
              <Box bg="#2EB192" borderColor="#fff" borderWidth="1px" width="100%" height="100%" borderRadius="20px"></Box>
            </Box>
            <Box position="absolute" left="105%" top="-5px" bg="#FCF9FF" width="4" height="4" borderRadius="20px" padding="2px">
              <Box bg="#2EB192" borderColor="#fff" borderWidth="1px" width="100%" height="100%" borderRadius="20px"></Box>
            </Box>
          </Box>
          <Text fontSize="16px" lineHeight="21px" fontWeight="300" px={6}>{content}</Text>
        </View>
        <Box mb="10" mt="4">
          <TabbedPanel
            tabs={allTierData.map(tierItem => {
              return {
                title: tierItem.fields.name,
                content: (
                  <View mt={4}>
                    {allMenuGroups.map((group, index) => {
                      return (
                        <Box
                          mb={
                            allMenuGroupNames.length - 1 !==
                              index
                              ? '0'
                              : '10'
                          }
                          px="4"
                          key={`${index}-unfilteredcontent`}
                        >
                          {group.menuGroups.map(
                            (finalGroup, index) => {
                              return finalGroup.menuItems
                                .map(
                                  (item, itemIndex) => {
                                    
                                    return (
                                      <RewardItemContainer
                                        name={item.name}
                                        points={item.price}
                                        key={`${itemIndex}-unfilteredcontent`}
                                        onPress={() => navigation.navigate('Food', { screen: 'FoodOrderingHome', params: { guid: item.guid, isReward: true }  })}
                                        imageRight={true}
                                        disabled={tierItem.fields.points > user.points}
                                      />
                                    );
                                  }
                                );
                            }
                          )}
                        </Box>
                      );
                    })}
                  </View>
                )
              }
            })
            }
          />
        </Box>
      </ScrollView>
    </VStack>
  );
};

export default ProfilePointScreen;
