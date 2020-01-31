import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {Images} from 'src/Theme';
import Style from './NotificationCardStyle';

import moment from 'moment';
import {baseUrl} from 'src/constants';

export default function Card({item, proc}) {
  return (
    <TouchableOpacity style={Style.CardWrap} onPress={proc}>
      <View style={{flex: 1}}>
        <Image style={Style.AvatarStyle} source={Images.maleProfile} />
      </View>
      <View
        style={{
          flex: 10,
          paddingLeft: 30,
        }}>
        <Text>Administrator</Text>

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
