import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {Images} from 'src/Theme';
import Style from './NewsCardStyle';
import {Card} from 'react-native-shadow-cards';
import moment from 'moment';
import {baseUrl} from 'src/constants';

export default function NewsCard({item, proc}) {
  return (
    <TouchableOpacity style={Style.CardWrap} onPress={proc}>
      <Card style={{padding: 12}}>
        <View style={Style.CardInfoWrap}>
          <View style={Style.ImageSection}>
            <Image style={Style.AvatarStyle} source={Images.maleProfile} />
          </View>
          <View style={Style.UserName}>
            <Text>Administrator</Text>
          </View>
        </View>
        <View style={Style.CardDesAndImgContainer}>
          <View style={Style.CardDescription}>
            <Text numberOfLines={2} style={Style.CardDescriptionText}>
              {item.content}
            </Text>
          </View>
        </View>
        <View style={Style.CardLocation}>
          <View style={Style.CardLocationGroup}>
            <Text style={Style.CardLocationText}>
              {moment(item.createAt).format('M月D日 ')}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
