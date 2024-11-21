import React, {
  useEffect,
  useState,
  useContext
} from 'react';
import {
  Box,
  NativeBaseProvider,
  extendTheme,
  useColorModeValue
} from 'native-base';

import 'expo-dev-client';

import { NavigationContainer } from '@react-navigation/native';
import {
  theme as fourMTheme,
  tokens
} from '@wearemoonello/4m-ui-theme';
import Amplify, { Auth } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { LogBox } from 'react-native';
import Constants from 'expo-constants';
import { has } from 'lodash';

import awsconfig from './src/aws-exports';
import BottomTab from './src/navigators/BottomTab.js';
import colorModeManager from './src/helpers/colorModeManager';
import { ToastContextProvider } from './src/helpers/ToastContext';
import SplashScreen from './src/screens/SplashScreen';
import { user, AppContext } from './src/helpers/AppContext';
import { AppApi } from './src/helpers/appApi';

LogBox.ignoreLogs(['NativeBase:']);

// AWS Amplify
Amplify.configure(awsconfig);

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'light'
};

const configDependencies = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

// extend the theme
const theme = extendTheme({
  config,
  colors: fourMTheme.colors,
  fontConfig: tokens.fontConfig,
  fonts: fourMTheme.fonts,
  fontSizes: fourMTheme.fontSizes,
  components: fourMTheme.components
});

Constants.manifest.android.config = {
  config: {
    googleMaps: { apiKey: process.env.GOOGLE_MAP_API_KEY }
  }
};
Constants.manifest.ios.config = {
  googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY
};

const appApi = new AppApi();

let initialRouteName = ''; //Food';

export default function App() {
  const { toastLoaded, user, setUserData, getData } =
    useContext(AppContext);

  // useFonts
  let [fontsLoaded, fontsLoadedError] = useFonts({
    'CodecPro-Bold': require('./assets/fonts/CodecPro-Bold.otf'),
    'CodecPro-ExtraBold': require('./assets/fonts/CodecPro-ExtraBold.otf'),
    'CodecPro-Light': require('./assets/fonts/CodecPro-Light.otf'),
    'CodecPro-News': require('./assets/fonts/CodecPro-News.otf')
  });

  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  async function checkAuthState() {
    Auth.currentAuthenticatedUser({
      bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then(user => {
        console.log('✅ User is signed in');
        setUserLoggedIn(true);
        setUserData(user.attributes.email);
      })
      .catch(err => {
        console.log('❌ User is not signed in');
        setUserLoggedIn(false);
        // setUserData('matt@moonello.com');
      });
  }

  useEffect(async () => {
    await checkAuthState();
  }, []);

  useEffect(async () => {
    const data = await appApi.getData();
    console.log('###', data);
    if (has(data, 'table') && data.table) {
      initialRouteName = 'Food';
    }
  }, []);

  const statusBarcolor = useColorModeValue('dark', 'white');

  return (
    <NativeBaseProvider
      theme={theme}
      config={configDependencies}
      colorModeManager={colorModeManager}
    >
      <ToastContextProvider>
        <Box
          h="100%"
          w="100%"
          borderWidth="0px"
          style={{ backgroundColor: 'rgba(0,0,0,0)' }}
        >
          <NavigationContainer>
            {fontsLoaded ? (
              <>
                <BottomTab
                  initialRouteName={initialRouteName}
                />
                <StatusBar style={statusBarcolor} />
              </>
            ) : (
              <SplashScreen />
            )}
          </NavigationContainer>
        </Box>
      </ToastContextProvider>
    </NativeBaseProvider>
  );
}
