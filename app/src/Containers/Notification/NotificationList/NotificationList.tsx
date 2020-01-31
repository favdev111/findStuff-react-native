import React, {useEffect, useState, useContext, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Images, Colors} from 'src/Theme';
import Styles from './NotificationListStyle';
import NotificationCard from 'src/Components/Card/NotificationCard/NotificationCard';
import {store} from 'src/Store';
import {baseUrl} from 'src/constants';
import axios from 'axios';

import {NavigationEvents} from 'react-navigation';

const NotificationList = props => {
  const [state, dispatch] = useContext(store);
  const [list, setList] = useState([]);

  const getList = () => {
    axios
      .get(baseUrl + 'api/notification', {})
      .then(function(response) {
        setList(response.data);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <ScrollView style={{backgroundColor: '#f4f6f8'}}>
      <NavigationEvents
        onDidFocus={() => {
          if (!state.user._id) props.navigation.navigate('Signin');
          else {
            getList();
          }
        }}
      />
      <View style={Styles.CategoryListContainer}>
        <View style={Styles.FindStuffHeaderContainer}>
          <TouchableOpacity style={{flex: 1}}>
            <Image
              source={Images.whiteLeftChevron}
              style={Styles.FindStuffHeaderImg}
            />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 20, color: '#fff'}}>通知</Text>
          </View>
          <View style={{flex: 1}}></View>
        </View>
        <View style={Styles.NotificationTabContainer}>
          {list.map((item, i) => (
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
