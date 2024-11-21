import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import React from 'react';

import showRequest from './src/utils/showRequest';

import App from './App';
import { AppContextProvider } from './src/helpers/AppContext';

const AppWrapper = () => {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
};

if (process.env.SHOW_REQUESTS_IN_CHROME) {
  showRequest();
}
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(AppWrapper);
