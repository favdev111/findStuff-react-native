import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {Images, Colors} from 'src/Theme';
import Styles from './NotificationDetailStyle';

import moment from 'moment';
import {baseUrl} from 'src/constants';

const axios = require('axios');

export default function StuffPostDetail({navigation}) {
  const [item, setItem] = useState(navigation.getParam('item'));
  useEffect(() => {}, []);

  return (
    <>
      <ScrollView style={{backgroundColor: '#f4f6f8'}}>
        <View>
          <View style={Styles.FindStuffHeaderContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('NotificationView')}>
              <Image
                source={Images.whiteLeftChevron}
                style={Styles.FindStuffHeaderImg}
              />
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 20, color: '#fff'}}>详情</Text>
            </View>
            <View></View>
          </View>
          <View style={Styles.UserInfoContainer}>
            <View style={Styles.AvatarContainer}>
              <View style={Styles.AvatarPhotoContainer}>
                <Image style={Styles.AvatarPhoto} source={Images.maleProfile} />

                <View style={Styles.UserNameContainer}>
                  <View style={Styles.UserNameWrap}>
                    <View>
                      <Text>{'Administrator'}</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={{color: Colors.grey}}>
                      {moment(item.createAt).format('M月D日 ')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={Styles.StuffInfoContainer}>
            <View>
              <Text style={{color: Colors.grey}}>{item.content}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
