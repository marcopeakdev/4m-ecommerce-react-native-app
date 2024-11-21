import {
  Actionsheet,
  AlertDialog,
  Box,
  Button,
  Center,
  FlatList,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  ScrollView,
  Text,
  useColorModeValue,
  useDisclose,
  useTheme,
  VStack
} from 'native-base';
import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useMemo
} from 'react';
import { AppContext } from '../../helpers/AppContext';
import TabbedPanel from '../../components/TabbedPanel';
import {
  splitExpDate,
  splitFullName,
  verifyCCNumber,
  verifyCVV,
  verifyExpDate
} from '../../helpers/formatStrings';
import { useFocusEffect } from '@react-navigation/native';
import {
  postCreateCreditCard,
  postPaymentMethods,
  redactPaymentMethod
} from '../../helpers/spreedlyAPICalls';
import CardListItem from '../../components/CardListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NewCardForm from '../../components/NewCardForm';
import CreditCard from 'react-native-credit-card-v2';
import CheckerCC from 'card-validator';

import ccBackground from '../../../assets/images/cc-background.png';

const PaymentMethods = ({ route, navigation }, props) => {
  const { isPayment, screenName } = route.params ?? {};
  const { colors } = useTheme();

  const { setBottomTabHide, user } = useContext(AppContext);

  const [cardInfo, setCardInfo] = useState({
    holderName: '',
    cardNumber: '',
    expiry: ''
  });

  const [savedPaymentMethods, setSavedPaymentMethods] =
    useState(null);

  const [cardAdded, setCardAdded] = useState(0);
  const [primaryCard, setPrimaryCard] = useState('');
  const [activeTitle, setActiveTitle] = useState('NEW');

  useFocusEffect(() => {
    setBottomTabHide(true);

    return () => setBottomTabHide(false);
  });

  const navigateToViewPaymentType = () => {
    navigation.navigate('ViewPaymentType', {
      cardAdded: true
    });
  };

  const setAsPrimary = async value => {
    if (value !== '') {
      const obj =
        savedPaymentMethods.payment_methods.credit_card.find(
          o => o.token === value
        );

      const objToStore = {
        card_type: obj.card_type,
        payment_method_type: obj.payment_method_type,
        last_four_digits: obj.last_four_digits,
        created_at: obj.created_at
      };

      try {
        const set = await AsyncStorage.setItem(
          '@primary-card',
          JSON.stringify(objToStore)
        );
        setPrimaryCard(value);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const setFirstPrimary = async obj => {
    if (obj && obj !== '') {
      const objToStore = {
        card_type: obj.card_type,
        payment_method_type: obj.payment_method_type,
        last_four_digits: obj.last_four_digits,
        created_at: obj.created_at
      };

      try {
        const set = await AsyncStorage.setItem(
          '@primary-card',
          JSON.stringify(objToStore)
        );
        setPrimaryCard(obj.token);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const cardType = useMemo(() => {
    if (cardInfo?.cardNumber) {
      const numberValidation = CheckerCC.number(
        cardInfo?.cardNumber
      );
      return numberValidation.card?.type;
    }
    return '';
  }, [cardInfo]);

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
        console.log('Get Saved Payment Methods Data', data);

        setSavedPaymentMethods(data);
        setCardAdded(
          data.payment_methods.credit_card.length +
            data.payment_methods.apple_pay.length +
            data.payment_methods.google_pay.length
        );
      })

      .catch(error => {
        console.log(error);
      });
  }, [cardAdded]);

  return (
    <Box
      borderWidth={0}
      flex={1}
      pt={10}
      mt={10}
      px={0}
      safeArea
    >
      <VStack space="6" flex={1}>
        {activeTitle === 'NEW' && (
          <Box px={4}>
            <CreditCard
              imageFront={ccBackground}
              imageBack={ccBackground}
              shiny={true}
              bar={true}
              width={'100%'}
              height={250}
              mainContainerStyle={{
                borderRadius: 25
              }}
              frontImageStyle={{
                borderRadius: 5
              }}
              frontImageBgStyle={{
                borderRadius: 5
              }}
              backImageStyle={{
                borderRadius: 5
              }}
              backImageBgStyle={{
                borderRadius: 5
              }}
              name={cardInfo?.holderName}
              number={cardInfo?.cardNumber}
              type={cardType}
              expiry={cardInfo?.expiry}
              showExpiryAfterLabel={false}
              cvc={cardInfo?.cvc}
            />
          </Box>
        )}
        <Box flex="1">
          <TabbedPanel
            tabs={[
              {
                title: 'NEW',
                content: (
                  <NewCardForm
                    setCardAdded={setCardAdded}
                    cardAdded={cardAdded}
                    setFirstPrimary={setFirstPrimary}
                    setPrimaryCard={setPrimaryCard}
                    cardDetail={cardInfo}
                    setCardDetail={setCardInfo}
                    navToPaymentType={
                      navigateToViewPaymentType
                    }
                    param={{ isPayment, screenName }}
                  />
                )
              },
              {
                title: 'SAVED',
                content: (
                  <Saved
                    methods={
                      savedPaymentMethods
                        ? savedPaymentMethods.payment_methods
                        : {}
                    }
                    email={user.email}
                    setCardAdded={setCardAdded}
                    cardAdded={cardAdded}
                    setAsPrimary={setAsPrimary}
                    primaryCard={primaryCard}
                    setPrimaryCard={setPrimaryCard}
                  />
                )
              }
            ]}
            onChangeTab={active => setActiveTitle(active)}
          />
        </Box>
      </VStack>
    </Box>
  );
};

const Saved = props => {
  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(async () => {
    try {
      const savedPrimaryJSON = await AsyncStorage.getItem(
        '@primary-card'
      );

      if (savedPrimaryJSON) {
        const savedPrimary = JSON.parse(savedPrimaryJSON);

        const card = props.methods.credit_card.find(
          card =>
            card.card_type === savedPrimary.card_type &&
            card.last_four_digits ===
              savedPrimary.last_four_digits &&
            card.payment_method_type ===
              savedPrimary.payment_method_type &&
            card.created_at === savedPrimary.created_at
        );
        setPrimaryCard(card.token);
      }
    } catch (e) {
      const removePrimary = await AsyncStorage.removeItem(
        '@primary-card'
      );
      console.log(removePrimary);
      console.log(e);
    }
  }, []);

  const [cardSelected, setCardSelected] = useState('');

  const [deleteAlertModal, setDeleteAlertModal] =
    useState(false);

  const cancelRef = useRef(null);

  const {
    email,
    cardAdded,
    setCardAdded,
    setAsPrimary,
    primaryCard,
    setPrimaryCard
  } = props;

  const redactSelectedCard = async () => {
    const cardToDelete = props.methods.credit_card.find(
      card => card.token === cardSelected
    );

    console.log('card to delete', cardToDelete);

    try {
      const fullCard = await postPaymentMethods({
        ccData: {
          firstName: cardToDelete.metadata.first_name,
          lastName: cardToDelete.metadata.last_name,
          email: email,
          token: cardToDelete.token
        }
      });

      const deletedCard = await redactPaymentMethod({
        ccData: {
          firstName: cardToDelete.metadata.first_name,
          lastName: cardToDelete.metadata.last_name,
          email: email,
          token: cardToDelete.token
        }
      });

      setCardAdded(cardAdded - 1);

      console.log('Deleted Card', deletedCard);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <VStack flex="1" px="4" space="4">
      <FlatList
        data={props.methods.credit_card}
        renderItem={method => (
          <CardListItem
            {...method}
            setCardSelected={setCardSelected}
            cardSelected={cardSelected}
            primaryCard={primaryCard}
          />
        )}
        keyExtractor={(item, index) =>
          `${item.card_type}-${item.last_four_digits}-${index}`
        }
      />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={deleteAlertModal}
        onClose={() => setDeleteAlertModal(false)}
        _backdrop={{
          opacity: 0.5
        }}
        position="absolute"
        h="100%"
        w="100%"
        left="0"
        top="0"
        px="4"
      >
        <AlertDialog.Content
          borderRadius={15}
          width="100%"
          p="4"
        >
          <AlertDialog.Body pb={1}>
            <VStack space="6">
              <VStack>
                <Heading textAlign={'center'}>
                  Do you really want to delete this card?
                </Heading>

                <Text textAlign={'center'}>
                  Once a card is delete you will no longer
                  have access to it.
                </Text>
              </VStack>
              <VStack space="4">
                <Button
                  variant="purple"
                  onPress={() => {
                    redactSelectedCard();
                    setDeleteAlertModal(false);
                  }}
                  _disabled={{
                    bg: 'brand.lightGrayOnBlack',
                    opacity: 1,
                    _text: { opacity: 0.4 }
                  }}
                >
                  DELETE CARD
                </Button>
                <Button
                  variant="secondary"
                  onPress={() => {
                    setDeleteAlertModal(false);
                  }}
                >
                  CANCEL
                </Button>
              </VStack>
            </VStack>
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
      <VStack space="4" pb="16">
        <Button
          variant="secondary"
          onPress={() => {
            setDeleteAlertModal(true);
          }}
          isDisabled={cardSelected === ''}
        >
          Delete Card
        </Button>
        <Button
          variant="purple"
          onPress={() => setAsPrimary(cardSelected)}
          isDisabled={cardSelected === ''}
          _disabled={{
            bg: 'brand.lightGrayOnBlack',
            opacity: 1,
            _text: { opacity: 0.4 }
          }}
        >
          Set as Primary
        </Button>
      </VStack>
    </VStack>
  );
};

export default PaymentMethods;
