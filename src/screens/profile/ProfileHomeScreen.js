import React, {
  useState,
  useContext,
  useEffect
} from 'react';

import {
  Heading,
  HStack,
  ScrollView,
  VStack
} from 'native-base';

import { API, Auth, graphqlOperation } from 'aws-amplify';

import ListItem from '../../components/ListItem';
import CustomModal from '../../components/CustomModal';

import { awsSignOut } from '../../helpers/awsAuthCalls';

import { AppContext } from '../../helpers/AppContext';

import { listAccounts } from '../../graphql/queries';

export default ProfileHomeScreen = ({ navigation }) => {
  const { userLoggedOut } = useContext(AppContext);
  const [signoutModal, setSignoutModal] = useState(false);
  const [user, setUser] = useState({});

  useEffect(async () => {
    const user = await Auth.currentUserInfo();

    const { data } = await API.graphql(
      graphqlOperation(listAccounts, {
        filter: {
          email: {
            eq: user.attributes.email
          }
        }
      })
    );

    setUser(data.listAccounts.items[0]);
  }, []);

  const confirmSignout = () => {
    awsSignOut()
      .then(() => {
        navigation.navigate('Home');
        userLoggedOut();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <VStack
      borderWidth={0}
      flex={1}
      pt={10}
      mt={0}
      px={4}
      safeArea
      space={0}
    >
      <ScrollView>
        <VStack space={6}>
          <VStack space={4} px={0} alignItems="center">
            <VStack space={2} alignItems="center">
              <Heading
                variant="header1"
                fontSize="xl"
                mb={-2}
                textAlign="center"
              >
                {user && user.name
                  ? `${user.name}`
                  : 'Your Account'}
              </Heading>
              <HStack space={4} alignItems="center">
                <Heading
                  variant="captionTitle"
                  fontSize="xs"
                >
                  {user && user.points
                    ? `${user.points} POINTS`
                    : '0 POINTS'}
                </Heading>
                <Heading
                  variant="captionTitle"
                  fontSize="xs"
                >
                  10 tokens
                </Heading>
              </HStack>
            </VStack>
          </VStack>
          <VStack space={6} mb={4}>
            <VStack>
              <Heading
                variant="subHeader"
                fontSize="xl"
                borderBottomWidth={1}
                borderColor={'brand.lightgrey'}
                textTransform="uppercase"
              >
                Management
              </Heading>
              <ListItem
                item={{
                  title: 'Purchases',
                  onPressNav: () => {
                    console.log('Navigate Away');
                  }
                }}
              />
              <ListItem
                item={{
                  title: 'Rewards',
                  onPressNav: () => {
                    navigation.navigate('ProfilePoints', {
                      user
                    });
                  }
                }}
              />
              <ListItem
                item={{
                  title: 'Membership',
                  onPressNav: () => {
                    console.log('Navigate Away');
                  }
                }}
              />
            </VStack>
            <VStack>
              <Heading
                variant="subHeader"
                fontSize="xl"
                borderBottomWidth={1}
                borderColor={'brand.lightgrey'}
                textTransform="uppercase"
              >
                Settings
              </Heading>
              <ListItem
                item={{
                  title: 'Profile Information',
                  onPressNav: () => {
                    navigation.navigate('ProfileOptions');
                  }
                }}
              />
              <ListItem
                item={{
                  title: 'Login Information',
                  onPressNav: () => {
                    navigation.navigate('LoginInfo');
                  }
                }}
              />
              <ListItem
                item={{
                  title: 'Payment Methods',
                  onPressNav: () => {
                    navigation.navigate('PaymentMethods');
                  }
                }}
              />
              <ListItem
                item={{
                  title: 'Sign Out',
                  onPressNav: () => {
                    setSignoutModal(!signoutModal);
                  }
                }}
              />
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
      <CustomModal
        bodyText="Are you sure you want to Sign Out?"
        confirmText="YES"
        isOpen={signoutModal}
        toggleIsOpen={() => setSignoutModal(!signoutModal)}
        confirmOnPress={() => {
          confirmSignout();
        }}
      />
    </VStack>
  );
};
