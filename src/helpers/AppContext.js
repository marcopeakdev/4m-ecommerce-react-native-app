import React, { createContext, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listAccounts } from '../graphql/queries';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [toastLoaded, setToastLoaded] = useState(false);
  const [bottomTabHide, setBottomTabHide] = useState(false);

  const defaultUser = {
    id: '',
    name: '',
    phone: '',
    points: 0,
    email: ''
  };

  const [user, setUser] = useState(defaultUser);

  const userLoggedOut = () => {
    setUser(defaultUser);
  };

  const setUserData = async authEmail => {
    const { data } = await API.graphql(
      graphqlOperation(listAccounts, {
        filter: {
          email: {
            eq: authEmail.toLowerCase()
          }
        }
      })
    );

    const { id, name, phone, points, email } =
      data.listAccounts.items[0];
    const setUserInfo = {
      id: id,
      name: name,
      phone: phone,
      points: points,
      email: email
    };
    setUser(setUserInfo);
  };

  return (
    <AppContext.Provider
      value={{
        toastLoaded,
        setToastLoaded,
        user,
        setUser,
        setUserData,
        bottomTabHide,
        setBottomTabHide,
        userLoggedOut
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
