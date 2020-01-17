import React from 'react';
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
import NotificationTab from 'src/Containers/Notification/NotificationTab/NotificationTab';

export default class NotificationList extends React.Component {
  render() {
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
            <NotificationTab />
          </View>
        </View>
      </ScrollView>
    );
  }
}
