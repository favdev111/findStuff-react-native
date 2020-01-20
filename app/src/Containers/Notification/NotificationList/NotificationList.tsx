import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {Images, Colors} from 'src/Theme';
import Styles from './NotificationListStyle';
import NotificationCard from 'src/Components/Card/NotificationCard/NotificationCard';

import {baseUrl} from 'src/constants';
const axios = require('axios');

export default function NotificationList(props) {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      .get(baseUrl + 'api/notification', {})
      .then(function(response) {
        console.log(response.data);

        setList(response.data);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }, []);
  return (
    <ScrollView style={{backgroundColor: '#f4f6f8'}}>
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
}
