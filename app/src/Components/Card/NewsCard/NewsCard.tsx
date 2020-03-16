import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images} from 'src/Theme';
import Style from './NewsCardStyle';
import {Card} from 'react-native-shadow-cards';
import moment from 'moment';

export default function NewsCard({item, proc}) {
  return (
    <TouchableOpacity style={Style.CardWrap} onPress={proc}>
      <Card style={{padding: 12, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <View style={Style.ImageSection}>
            <FastImage style={Style.AvatarStyle} source={Images.maleProfile} />
          </View>
        </View>
        <View style={{flex: 5}}>
          <View>
            <Text>管理员</Text>
          </View>
          <View style={Style.CardDescription}>
            <Text numberOfLines={2} style={Style.CardDescriptionText}>
              {item.content}
            </Text>
          </View>
          <View>
            <Text style={Style.CardLocationText}>
              {moment(item.createAt).format('M月D日 ')}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
