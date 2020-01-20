import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {Images} from 'src/Theme';
import Style from './CardStyle';
import RoundBtn from 'src/Components/Buttons/RoundBtn/RoundBtn';

import moment from 'moment';
import {baseUrl} from 'src/constants';

export default function StuffCard({item, proc, navigation}) {
  return (
    <TouchableOpacity style={Style.CardWrap} onPress={proc}>
      <View style={Style.CardInfoWrap}>
        <View style={Style.ImageSection}>
          {item.user.photo.length === 0 && (
            <Image style={Style.AvatarStyle} source={Images.maleProfile} />
          )}
          {item.user.photo.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserInfo', {item: item.user});
              }}>
              <Image
                style={Style.AvatarStyle}
                source={{
                  uri: baseUrl + 'download/photo?path=' + item.user.photo,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={Style.UserName}>
          <Text>{item.user.name}</Text>
          <Text style={Style.Userdate}>
            {moment(item.createAt).format('M月D日 ')}
          </Text>
        </View>
        <View style={Style.CardBtnGroup}>
          <View></View>
          <View>
            <View style={Style.CardCatBtnWrap}>
              {item.fee > 0 && (
                <RoundBtn
                  RoundBtnTitle={'赏 ¥ ' + item.fee}
                  RoundBtnColor={'MainRed'}
                />
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={Style.CardDesAndImgContainer}>
        <View style={Style.CardDescription}>
          <Text numberOfLines={3} style={Style.CardDescriptionText}>
            {item.description}
          </Text>
        </View>
        <View style={Style.CardImageSection}>
          <Image
            source={{
              uri: baseUrl + 'download/photo?path=' + item.photos[0].path,
            }}
            style={Style.CardImage}
          />
        </View>
      </View>
      <View style={Style.CardLocation}>
        <View style={Style.CardLocationGroup}>
          <Image style={Style.CardLocationImg} source={Images.BlueMapIcon} />
          <Text style={Style.CardLocationText}>{item.place}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
