import {
  VStack,
  Heading,
  Text,
  Image,
  PresenceTransition
} from 'native-base';
import React, {
  useContext,
  useState,
  useEffect
} from 'react';
import { AppContext } from '../../helpers/AppContext';
import OrderCompleteIcon from '../../../assets/icons/OrderComplete';
import BillBack from '../../../assets/images/bill_back.png';
import { useFocusEffect } from '@react-navigation/native';
const TabConfirmationScreen = (
  { navigation, route },
  props
) => {
  const { setBottomTabHide } = useContext(AppContext);
  useFocusEffect(() => {
    setBottomTabHide(true);
    return () => setBottomTabHide(false);
  });
  const { user } = useContext(AppContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 200);

    setTimeout(() => {
      setVisible(false);
    }, 11200);

    let navigateTimeout = setTimeout(() => {
      clearTimeout(navigateTimeout);
      navigation.navigate('ViewCheck');
    }, 11500);
  }, []);

  return (
    <VStack
      borderWidth={0}
      flex={1}
      pt={10}
      px={4}
      mt={10}
      safeArea
      space={6}
      alignItems="center"
    >
      <PresenceTransition
        visible={visible}
        initial={{
          translateY: 1000
        }}
        animate={{
          translateY: 0,
          transition: {
            delay: 100,
            duration: 600,
            easing: x =>
              x < 0.5
                ? 4 * x * x * x
                : 1 - Math.pow(-2 * x + 2, 3) / 2
          }
        }}
      >
        <VStack mb="20" mt="10" height="75%">
          <Image
            resizeMode="stretch"
            source={BillBack}
            alt="4m"
            position="absolute"
            left="0"
            top="0"
            zIndex="0"
            width="100%"
            height="100%"
          />
          <VStack
            alignItems="center"
            borderTopRadius="20"
            p="2"
            mt="6"
            pt="40px"
            space="4"
            px="8"
          >
            <OrderCompleteIcon size="5xl" />
            <VStack alignItems="center" space="1" pt="4">
              <Heading
                variant="captionTitle"
                fontSize="14.22px"
                lineHeight="12.21px"
                letterSpacing="6"
              >
                Order
              </Heading>
              <Heading
                variant="captionTitle"
                fontSize="14.22px"
                lineHeight="12.21px"
                letterSpacing="6"
              >
                Confirmed
              </Heading>
            </VStack>

            <Text
              textAlign={'center'}
              variant="captionBody"
              fontSize="16px"
              lineHeight="24px"
              fontWeight="200"
            >
              Your food is being cooked up right now and
              will be brought to you!
            </Text>
          </VStack>
        </VStack>
      </PresenceTransition>
    </VStack>
  );
};
export default TabConfirmationScreen;
