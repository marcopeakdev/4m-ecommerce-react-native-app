import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  useColorModeValue,
  VStack
} from 'native-base';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {
  getAccountByEmail,
  listAccounts
} from '../../graphql/queries';

const ProfileContactScreen = props => {
  const [invalidPassword, setInvalidPassword] =
    useState(false);
  const [mismatchedPassword, setMismatchedPassword] =
    useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [validPassword, setValidPassword] = useState(false);

  const handleNameChange = event => {
    console.log(event.nativeEvent.text);
    setName(event.nativeEvent.text);
  };

  const handleEmailChange = event => {
    setEmail(event.nativeEvent.text);
  };

  const handleEmailBlur = () => {};

  const handlePhoneChange = event => {
    setPhone(event.nativeEvent.text);
  };

  const handlePhoneBlur = () => {};

  const resetInvalidPassword = () => {
    setInvalidPassword(false);
  };

  const resetMismatchedPassword = () => {
    setMismatchedPassword(false);
  };

  const handleSubmit = () => {};

  useEffect(async () => {
    const userInfo = await Auth.currentUserInfo();

    const { data } = await API.graphql(
      graphqlOperation(listAccounts, {
        filter: { email: { eq: userInfo.attributes.email } }
      })
    );

    console.log(data.listAccounts.items[0]);

    setName(
      data.listAccounts.items[0].name
        ? data.listAccounts.items[0].name
        : ''
    );
    setEmail(
      data.listAccounts.items[0].email
        ? data.listAccounts.items[0].email
        : ''
    );
    setPhone(
      data.listAccounts.items[0].phone
        ? data.listAccounts.items[0].phone
        : ''
    );

    /* Auth.currentUserInfo().then(data => {
      console.log(data.attributes.email);
    }); */
  }, []);

  const handleSaveContact = async () => {
    const userInfo = await Auth.currentUserInfo();
  };

  return (
    <Box
      borderWidth={0}
      flex={1}
      pt={10}
      mt={10}
      px={4}
      justifyContent="space-between"
      safeArea
    >
      <VStack space={4} width="100%">
        <Heading
          variant="subHeader"
          fontSize="lg"
          borderBottomWidth={2}
          borderColor={useColorModeValue(
            'brand.dark',
            'brand.lightgrey'
          )}
        >
          SECURITY
        </Heading>
        <Box>
          <Heading variant="captionTitle" fontSize="sm">
            NEW PASSWORD
          </Heading>
          <Text>
            Enter a new password to change your existing
            password for your account.
          </Text>
        </Box>
        <VStack alignItems="center">
          <Input
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            onFocus={() => {
              setName('');
            }}
            color={useColorModeValue(
              'brand.dark',
              'brand.white'
            )}
            selectionColor={useColorModeValue(
              'brand.dark',
              'brand.white'
            )}
            variant={'authProfile'}
            keyboardType="email-address"
            autoCapitalize="words"
          />
        </VStack>
        <VStack alignItems="center" width="100%">
          <VStack
            width="100%"
            alignItems="center"
            space={2}
          >
            <Input
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              type={'email-address'}
              onFocus={() => {}}
              color={useColorModeValue(
                'brand.dark',
                'brand.white'
              )}
              selectionColor={useColorModeValue(
                'brand.dark',
                'brand.white'
              )}
              variant={'authProfile'}
              autoCapitalize="none"
            />
            <Input
              placeholder="Phone Number"
              value={phone}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              onFocus={() => {}}
              type={'password'}
              color={useColorModeValue(
                'brand.dark',
                'brand.white'
              )}
              selectionColor={useColorModeValue(
                'brand.dark',
                'brand.white'
              )}
              variant={'authProfile'}
              keyboardType="number-pad"
              autoCapitalize="none"
            />
          </VStack>
        </VStack>
      </VStack>
      <Box alignItems="center">
        <Button
          variant="main"
          mb={6}
          mt={2}
          onPress={handleSubmit}
          isDisabled={false}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileContactScreen;
