import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images} from 'src/Theme';
import Style from './NotificationCardStyle';

import moment from 'moment';

export default function Card({item, proc}) {
  return (
    <TouchableOpacity style={Style.CardWrap} onPress={proc}>
      <View style={{flex: 1}}>
        <FastImage style={Style.AvatarStyle} source={Images.maleProfile} />
      </View>
      <View
        style={{
          flex: 10,
          paddingLeft: 30,
        }}>
        <Text>管理员</Text>

        <View style={Style.CardDescription}>
          <Text numberOfLines={2} style={Style.CardDescriptionText}>
            {item.content}
          </Text>
        </View>

        <View
          style={{
            paddingTop: 10,
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}>
          <Text style={Style.CardLocationText}>
            {moment(item.createAt).format('M月D日:hh时mm分')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
