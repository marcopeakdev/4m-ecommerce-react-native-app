import React, {
  useState,
  useContext,
  useRef,
  useEffect
} from 'react';

import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Modal,
  Radio,
  ScrollView,
  Text,
  useColorMode,
  useToast,
  VStack
} from 'native-base';

import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API, graphqlOperation } from 'aws-amplify';

import { AppContext } from '../../helpers/AppContext';
import { updateAccount } from '../../graphql/mutations';

const ProfileOptionsScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [colorModeGroup, setColorModeGroup] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUserData } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const initialRef = useRef(null);

  const { colorMode, toggleColorMode } = useColorMode();

  const systemDefaultColor = Appearance.getColorScheme();
  const currentColorMode = colorMode;

  const toast = useToast();

  const profileUpdatedToast = {
    title: 'Profile Updated',
    placement: 'bottom',
    render: () => {
      return (
        <Box
          bg="brand.green"
          px="4"
          py="4"
          rounded="sm"
          mb="5"
        >
          <Text bold color="brand.white">
            Profile Updated!
          </Text>
        </Box>
      );
    }
  };

  const colorUpdatedToast = {
    title: 'Color Mode Updated',
    placement: 'bottom',
    render: () => {
      return (
        <Box
          bg="brand.green"
          px="4"
          py="4"
          rounded="sm"
          mb="5"
        >
          <Text bold color="brand.white">
            Color Mode Updated!
          </Text>
        </Box>
      );
    }
  };

  const loadColorModePreference = async () => {
    try {
      const savedColorModePreference =
        await AsyncStorage.getItem('@color-mode');

      setColorModeGroup(savedColorModePreference);
    } catch (error) {
      console.log(error);
      setColorModeGroup('system');
    }
  };

  const setColorModePreference = async mode => {
    console.log('Setting Color Mode');
    try {
      const setColorModePreference =
        await AsyncStorage.setItem('@color-mode', mode);
    } catch (error) {
      console.log(error);
    }
  };

  const updateColorMode = mode => {
    if (mode === 'system') {
      // Compare Appearance.getColorScheme() to colorMode, toggle if different

      if (systemDefaultColor !== currentColorMode) {
        toggleColorMode();
      }
    } else {
      // Compare mode to ColorMode, toggle if different
      if (mode !== currentColorMode) {
        toggleColorMode();
      }
    }
  };

  useEffect(() => {
    /* toast.show(colorUpdatedToast); */
    loadColorModePreference();
  }, []);

  const { name: userName, phone: userPhone, id } = user;

  useEffect(() => {
    setName(userName);
  }, [userName]);

  useEffect(() => {
    setPhone(userPhone);
  }, [userPhone]);

  const handleSave = async () => {
    console.log('Save Clicked');

    setColorModePreference(colorModeGroup);
    updateColorMode(colorModeGroup);

    toast.show(colorUpdatedToast);

    const payloadPhone =
      phone.length === 10 || phone.length === 0
        ? phone
        : null;

    const payload = {
      id: id,
      name: name,
      phone: payloadPhone
    };

    try {
      const { data } = await API.graphql(
        graphqlOperation(updateAccount, {
          input: payload
        })
      );

      setUserData(data.updateAccount.email);

      toast.show(profileUpdatedToast);

      console.log('updateAccount Results', data);
    } catch (error) {
      console.log('Error with updateAccount');
      console.log(error);
    }
  };

  const handleNameChange = event => {
    setName(event.nativeEvent.text);
  };

  const handlePhoneChange = event => {
    setPhone(event.nativeEvent.text);
  };

  const handleColorModeGroupChange = nextValue => {
    setColorModeGroup(nextValue);
  };

  const handlePasswordChange = event => {
    setPassword(event.nativeEvent.text);
  };

  const onDeleteAccount = () => {
    // need to check password
    // if success, proceed to delete account
    // if not, show error
    console.log('handle delete account');
  };

  return (
    <Box
      borderWidth={0}
      flex={1}
      pt={10}
      mt={10}
      px={4}
      safeArea
    >
      <ScrollView
        _contentContainerStyle={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <VStack width="100%" space={6} flex={1}>
          <FormControl>
            <FormControl.Label>
              Your Name:
            </FormControl.Label>
            <Input
              placeholder={name}
              onChange={handleNameChange}
              onFocus={() => {}}
              value={name}
              variant={'ecomInput'}
              autoCapitalize="none"
            />
          </FormControl>
          <FormControl
            isInvalid={
              phone && phone.length < 10 && phone.length > 0
            }
          >
            <FormControl.Label>
              Your Phone Number:
            </FormControl.Label>
            <Input
              placeholder={phone || ''}
              onChange={handlePhoneChange}
              onFocus={() => {}}
              value={phone}
              variant={'ecomInput'}
              autoCapitalize="none"
            />
            <FormControl.ErrorMessage>
              Please enter a valid U.S. phone number
            </FormControl.ErrorMessage>
          </FormControl>
          <VStack width="100%" space={2}>
            <Heading variant="captionTitle" fontSize="sm">
              Set Color Mode:
            </Heading>
            <Radio.Group
              value={colorModeGroup}
              onChange={nextValue =>
                handleColorModeGroupChange(nextValue)
              }
              _radio={{
                my: 0.5,
                ml: 1.5,
                colorScheme: 'brandPurple',
                _text: {
                  lineHeight: 15
                }
              }}
            >
              <Radio value="system">System Default</Radio>
              <Radio value="light">Light Mode</Radio>
              <Radio value="dark">Dark Mode</Radio>
            </Radio.Group>
          </VStack>

          <VStack width="100%" space={2}>
            <Heading variant="captionTitle" fontSize="sm">
              Danger Zone
            </Heading>
            <Button
              variant="secondary"
              _text={{ color: 'brand.dark' }}
              isDisabled={false}
              onPress={() => setModalVisible(!modalVisible)}
            >
              DELETE ACCOUNT
            </Button>
          </VStack>
        </VStack>
        <Box my={4} justifyContent="flex-end">
          <Button
            variant="purple"
            _text={{ color: 'brand.dark' }}
            isDisabled={false}
            onPress={handleSave}
            _disabled={{
              bg: 'brand.lightGrayOnBlack',
              opacity: 1,
              _text: { opacity: 0.4 }
            }}
          >
            SAVE
          </Button>
        </Box>
      </ScrollView>

      <Modal
        isOpen={modalVisible}
        initialFocusRef={initialRef}
        onClose={() => setModalVisible(false)}
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
        <Modal.Content borderRadius={15} width="100%" p="4">
          <Modal.Body pb={1}>
            <VStack space="6">
              <VStack>
                <Heading
                  mb="3"
                  fontSize="lg"
                  textAlign={'center'}
                >
                  You are about to delete your account.
                </Heading>
                <Text
                  lineHeight="18px"
                  textAlign={'center'}
                >
                  This is a permanant action and cannot be
                  undone. Please enter your password to
                  confirm.
                </Text>
              </VStack>
              <VStack space="4">
                <FormControl>
                  <FormControl.Label>
                    Provide Your Account Password:
                  </FormControl.Label>
                  <Input
                    ref={initialRef}
                    placeholder=""
                    minlength={8}
                    maxlength={20}
                    value={password}
                    onChange={handlePasswordChange}
                    type={'password'}
                    borderColor="brand.dark"
                  />
                  <FormControl.ErrorMessage>
                    Incorrect. Please try again.
                  </FormControl.ErrorMessage>
                </FormControl>
                <Button
                  variant="purple"
                  _text={{ color: 'brand.dark' }}
                  onPress={onDeleteAccount()}
                  _disabled={{
                    bg: 'brand.lightGrayOnBlack',
                    opacity: 1,
                    _text: { opacity: 0.4 }
                  }}
                >
                  Delete Account
                </Button>
              </VStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default ProfileOptionsScreen;
