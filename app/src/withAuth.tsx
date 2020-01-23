import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const withAuth = WrappedComponent => {
  const AuthenticationScreen = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      checkAuth();
      props.navigation.addListener('willFocus', async () => {
        await checkAuth();
      });
    }, []);

    const checkAuth = async () => {
      const result = await AsyncStorage.getItem('token');

      console.log(result, '=============check auth');

      if (result) {
        setIsAuthenticated(true);
      } else {
        props.navigation.navigate('Signin');
      }
    };

    if (!isAuthenticated) {
      return <Text>进入登录画面...</Text>;
    }
    return <WrappedComponent {...props} />;
  };

  return AuthenticationScreen;
};

export default withAuth;
