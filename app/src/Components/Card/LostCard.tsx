import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {Images} from 'src/Theme';
import Style from './CardStyle';
import RoundBtn from 'src/Components/Buttons/RoundBtn/RoundBtn';

import moment from 'moment';
import {baseUrl} from 'src/constants';

export default function LostCard({item, proc}) {
  return (
    <TouchableOpacity style={Style.CardWrap} onPress={proc}>
      <View style={Style.CardInfoWrap}>
        <View style={Style.ImageSection}>
          <Image style={Style.AvatarStyle} source={Images.maleProfile} />
        </View>
        <View style={Style.UserName}>
          <Text>分析过</Text>
          <Text style={Style.Userdate}>
            {moment(item.createAt).format('M月D日 ')}
          </Text>
        </View>
        <View style={Style.CardBtnGroup}>
          <View>
            <Image
              source={Images.FindBtnBadge}
              style={{width: 50, height: 15}}
            />
          </View>
          <View>
            <View style={Style.CardCatBtnWrap}>
              <RoundBtn
                RoundBtnTitle={'赏 ¥ ' + item.fee}
                RoundBtnColor={'MainRed'}
              />
              <RoundBtn
                RoundBtnTitle={'联系 TA'}
                RoundBtnColor={'MainYellow'}
              />
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
