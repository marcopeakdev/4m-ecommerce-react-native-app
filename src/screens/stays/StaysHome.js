import React, { useEffect, useState } from 'react';
import {
  VStack,
  Box,
  ScrollView,
  View,
  Image
} from 'native-base';
import staysLogo from '../../../assets/images/staysLogo.png';
import StayCard from '../../components/Stays/StayCard';
import { getListings } from '../../helpers/guestyApiCalls';

const StaysHome = ({ navigation, route }, props) => {
  const [isFetching, setFetching] = useState(false);
  const [allListings, setAllListings] = useState([]);

  useEffect(() => {
    const fetchIntegrations = async () => {
      setFetching(true);
      let listings = await getListings();
      setFetching(false);
      if (listings.length) {
        setAllListings(listings);
      }
    };
    fetchIntegrations();
  }, []);

  return (
    <VStack space={4} bgColor="white" flex={1}>
      <Box w="100%" h="80px" bg="white" rounded="md">
        <View
          flexDir="row"
          w="100%"
          mt="5"
          h="100%"
          alignItems="center"
          justifyContent="space-around"
        >
          <Image
            h="35px"
            w="112px"
            alt={'staysLogo'}
            source={staysLogo}
            resizeMode="contain"
          />
        </View>
      </Box>
      <ScrollView flex={1}>
        <View px="6" pt="4" pb="4" bgColor="#ffffff">
          {allListings.map((item, index) => (
            <StayCard
              key={'listing_' + index}
              item={item}
              navigation={navigation}
              index={index}
            />
          ))}
        </View>
      </ScrollView>
    </VStack>
  );
};

export default StaysHome;
