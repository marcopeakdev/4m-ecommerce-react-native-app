import {
  VStack,
  Box,
  Text,
  HStack,
  useColorModeValue,
  FlatList,
  Button
} from 'native-base';
import React, {
  useContext,
  useState,
  useEffect
} from 'react';

import { ToastContext } from '../../helpers/ToastContext';
import { AppContext } from '../../helpers/AppContext';
import { useFocusEffect } from '@react-navigation/native';
import { postPaymentMethods } from '../../helpers/spreedlyAPICalls';
import CardListItem from '../../components/CardListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewPaymentTypeScreen = (
  { navigation, route },
  props
) => {
  const { user: userParam, cardAdded } = route.params ?? {};

  const { setBottomTabHide } = useContext(AppContext);
  const [savedPaymentMethods, setSavedPaymentMethods] =
    useState({});

  const [cardsAdded, setCardsAdded] = useState(cardAdded);
  const [cardSelected, setCardSelected] = useState('');
  const [primaryCard, setPrimaryCard] = useState('');
  const [user, setUser] = useState(userParam);
  const { latestAWSPayload, setLatestAWSPayload } =
    useContext(ToastContext);
  const [buttonText, setButtonText] = useState(
    'Apply Payment Type'
  );

  useFocusEffect(() => {
    setBottomTabHide(true);

    return () => setBottomTabHide(false);
  });

  useEffect(() => {
    if (!user) {
      setUser(userParam);
    }
  }, [userParam]);

  const handleApply = () => {
    if (cardSelected) {
      console.log(
        'Saved Payment Methods',
        savedPaymentMethods
      );

      let cardItem = savedPaymentMethods.credit_card.find(
        item => item.token === cardSelected
      );

      /* console.log('latest AWS Payload', latestAWSPayload);
      console.log('Card Item', cardItem); */

      try {
        setLatestAWSPayload({
          ...latestAWSPayload,
          paymentMethod: cardItem
        });

        setButtonText('Applied');

        navigation.navigate('ViewTab');
      } catch (error) {
        setButtonText(JSON.stringify(error));
        console.log('Error', error);
      }
    }
  };

  useEffect(() => {
    postPaymentMethods({
      ccData: {
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1],
        email: user.email,
        userId: user.id
      }
    })
      .then(data => {
        setSavedPaymentMethods(data.payment_methods);
      })

      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(async () => {
    if (savedPaymentMethods) {
      try {
        const savedPrimaryJSON = await AsyncStorage.getItem(
          '@primary-card'
        );

        if (savedPrimaryJSON) {
          const savedPrimary = JSON.parse(savedPrimaryJSON);

          const card =
            savedPaymentMethods.credit_card?.find(
              card =>
                card.card_type === savedPrimary.card_type &&
                card.last_four_digits ===
                  savedPrimary.last_four_digits &&
                card.payment_method_type ===
                  savedPrimary.payment_method_type &&
                card.created_at === savedPrimary.created_at
            );
          if (card) {
            setPrimaryCard(card.token);
          }
        }
      } catch (e) {
        const removePrimary = await AsyncStorage.removeItem(
          '@primary-card'
        );
        console.log(removePrimary);
        console.log(e);
      }
    }
  }, [savedPaymentMethods]);

  return (
    <VStack
      borderWidth={0}
      flex={1}
      pt={10}
      mt={10}
      safeArea
      space={6}
    >
      <VStack px={4}>
        <Text
          textTransform={'uppercase'}
          fontWeight="bold"
          letterSpacing="2px"
        >
          Saved Cards
        </Text>
        <FlatList
          data={savedPaymentMethods.credit_card ?? []}
          renderItem={item => (
            <CardListItem
              {...item}
              setCardSelected={setCardSelected}
              cardSelected={cardSelected}
              primaryCard={primaryCard}
            />
          )}
          keyExtractor={(item, index) =>
            `${item.guid}-${index}`
          }
        />
        {!savedPaymentMethods.credit_card?.length && (
          <HStack
            mt={2}
            alignItems="center"
            justifyContent="center"
          >
            <Text>NO CARDS SAVED</Text>
          </HStack>
        )}
      </VStack>
      <VStack px={4} mt={2}>
        <Text
          textTransform={'uppercase'}
          fontWeight="bold"
          letterSpacing="2px"
        >
          GIFT Cards
        </Text>
        <FlatList
          data={[]}
          renderItem={item => (
            <CardListItem
              {...item}
              setCardSelected={setCardSelected}
              cardSelected={cardSelected}
              primaryCard={primaryCard}
            />
          )}
          keyExtractor={(item, index) =>
            `${item.guid}-${index}`
          }
        />
        {!savedPaymentMethods.gift_card && (
          <HStack
            mt={2}
            alignItems="center"
            justifyContent="center"
          >
            <Text>NO CARDS SAVED</Text>
          </HStack>
        )}
      </VStack>
      <VStack px={4} mt={2}>
        <Text
          textTransform={'uppercase'}
          fontWeight="bold"
          letterSpacing="2px"
        >
          Other
        </Text>
        <FlatList
          data={[]}
          renderItem={item => (
            <CardListItem
              {...item}
              setCardSelected={setCardSelected}
              cardSelected={cardSelected}
              primaryCard={primaryCard}
            />
          )}
          keyExtractor={(item, index) =>
            `${item.guid}-${index}`
          }
        />
        {!savedPaymentMethods.google_pay?.length &&
          !savedPaymentMethods.apple_pay?.length && (
            <HStack
              mt={2}
              alignItems="center"
              justifyContent="center"
            >
              <Text>NO CARDS SAVED</Text>
            </HStack>
          )}
      </VStack>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        width="100%"
        alignContent="center"
        px="4"
        pb="6"
      >
        <Button
          variant="purple"
          position="relative"
          onPress={handleApply}
          _disabled={{
            bg: 'brand.lightGrayOnBlack',
            opacity: 1,
            _text: { opacity: 0.4 }
          }}
        >
          <Text
            marginBottom="-4px"
            fontWeight="700"
            textTransform="uppercase"
            textAlignVertical="center"
            textAlign="center"
            color="brand.dark"
          >
            {buttonText}
          </Text>
        </Button>
      </Box>
    </VStack>
  );
};

export default ViewPaymentTypeScreen;
