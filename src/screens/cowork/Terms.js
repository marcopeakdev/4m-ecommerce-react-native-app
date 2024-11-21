import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, ScrollView, Pressable } from 'native-base';

import Header from '../../components/Cowork/Header';
import Note from '../../components/Cowork/Note';
import TermCard from '../../components/Cowork/TermCard';

import Typography from 'src/components/Typography';
import Button from 'src/components/Button';

import CheckBoxIcon from '../../../assets/icons/CheckboxIcon';

const terms = [
  {
    title: '1. Lorem ipsum',
    content:
      'dolor sit amet, consectetur adipiscing elit. Tempor, purus rhoncus volutpat sagittis. Velit aliquam quis sed est. Quam quam nibh metus sit amet. Tincidunt v libero accumsan nec adipiscing sed dignissim. Diam Aenean urna justo, amet viverra mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempor, purus rhoncus volutpat sagittis. Velit aliquam quis sed est. Quam quam nibh metus sit amet. '
  },
  {
    title: '2. Lorem ipsum',
    content:
      'dolor sit amet, consectetur adipiscing elit. Tempor, purus rhoncus volutpat sagittis. Velit aliquam quis sed est. Quam quam nibh metus sit amet. Tincidunt v libero accumsan nec adipiscing sed dignissim. Diam Aenean urna justo, amet viverra mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempor, purus rhoncus volutpat sagittis. Velit aliquam quis sed est. Quam quam nibh metus sit amet. '
  },
  {
    title: '3. Lorem ipsum',
    content:
      'dolor sit amet, consectetur adipiscing elit. Tempor, purus rhoncus volutpat sagittis. Velit aliquam quis sed est. Quam quam nibh metus sit amet. Tincidunt v libero accumsan nec adipiscing sed dignissim. Diam Aenean urna justo, amet viverra mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempor, purus rhoncus volutpat sagittis. Velit aliquam quis sed est. Quam quam nibh metus sit amet. '
  }
];

const Terms = ({ route }) => {
  const navigation = useNavigation();
  const [accepted, setAccepted] = useState(false);
  const checkoutType = route.params?.checkoutType;

  const acceptTerms = value => {
    setAccepted(value);
  };

  const onClickHandler = () => {
    navigation.navigate('CoWorkCheckout', {
      checkoutType
    });
  };

  return (
    <View>
      <Header title="Terms & Conditions" />
      <ScrollView>
        <Note />
        <View px="21px" pt="12px" pb="150px">
          {terms?.map((term, index) => (
            <TermCard {...term} key={index} />
          ))}
          <Pressable
            flexDir="row"
            alignItems="center"
            onPress={() => acceptTerms(!accepted)}
          >
            <CheckBoxIcon active={accepted} />
            <Typography ml="10px" type="semi_bold_14_12">
              I Agree to the above terms & conditions.
            </Typography>
          </Pressable>
          <Button
            variant="purple"
            h="48px"
            w="100%"
            mt="98px"
            _text={{
              color: '#202020',
              fontSize: '14.22px',
              lineHeight: '12px'
            }}
            onPress={onClickHandler}
            disabled={!accepted}
            _disabled={{
              bg: 'brand.lightGrayOnBlack',
              opacity: 1,
              _text: { opacity: 0.4 }
            }}
          >
            Continue to payment
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default Terms;
