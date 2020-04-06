import React, {useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images} from 'src/Theme';
import Styles from './NotificationListStyle';
import Style from 'src/Style';
import Header from 'src/Components/Header/Header';
import NotificationCard from 'src/Components/Card/NotificationCard/NotificationCard';
import {store} from 'src/Store';
import {baseUrl} from 'src/config';
import axios from 'axios';
import { BackHandler } from 'react-native';

import {NavigationEvents} from 'react-navigation';

const NotificationList = props => {
  const [state, dispatch] = useContext(store);

  const getList = () => {
    axios
      .get(baseUrl + 'api/notification', {
        params: {region: state.region, user_id: state.user._id},
      })
      .then(function(response) {
        dispatch({type: 'setNotifications', payload: response.data});
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.navigate('AppHome');
      return true;

    });
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('willFocus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        props.navigation.navigate('AppHome');
        return true;

      });
    });

    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('willBlur', () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        props.navigation.navigate('AppHome');
        return true;

      });
    });

    return unsubscribe;
  }, [props.navigation]);

  return (
    <ScrollView style={{backgroundColor: '#f4f6f8'}}>
      <NavigationEvents
        onDidFocus={() => {
          if (!state.user._id) props.navigation.navigate('Signin');
          else {
            dispatch({type: 'setCurrentScreen', payload: 'note-list'});
            getList();
          }
        }}
      />
      <View style={Styles.CategoryListContainer}>
        <Header
          back={() => props.navigation.navigate('AppHome')}
          label={'通知'}
        />

        <View style={Styles.NotificationTabContainer}>
          {state.notifications.map((item, i) => (
            <NotificationCard
              key={i}
              item={item}
              proc={() => {
                {
                  props.navigation.navigate('NotificationDetail', {item});
                }
              }}></NotificationCard>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default NotificationList;
