import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {Images} from 'src/Theme';
import Style from './CardStyle';
import RoundBtn from 'src/Components/Buttons/RoundBtn/RoundBtn';
import RectBtn from 'src/Components/Buttons/RectBtn/RectBtn';
import {Card} from 'react-native-shadow-cards';
import moment from 'moment';
import {baseUrl} from 'src/constants';

export default function StuffCard({item, proc, navigation}) {
  return (
    <TouchableOpacity onPress={proc} style={Style.CardWrap}>
      <Card style={{padding: 12}}>
        <View style={Style.CardInfoWrap}>
          <View style={Style.ImageSection}>
            {item.user && item.user.photo && item.user.photo.length === 0 && (
              <Image
                style={Style.AvatarStyle}
                source={Images.maleProfile}
                resizeMode="cover"
                borderRadius={30}
              />
            )}
            {item.user && item.user.photo && item.user.photo.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  if (navigation)
                    navigation.navigate('UserInfo', {item: item.user});
                }}>
                <Image
                  style={Style.AvatarStyle}
                  // source={{
                  //   uri: baseUrl + 'download/photo?path=' + item.user.photo,
                  // }}
                  source={Images.maleProfile}
                  resizeMode="cover"
                  borderRadius={30}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {item.user?.name && <Text>{item.user.name}</Text>}
              {item.kind === 'lost' && (
                <RectBtn
                  RectBtnTitle={'寻物招领'}
                  RectBtnColor={'blueTransparent90'}
                />
              )}
              {item.kind === 'found' && (
                <RectBtn
                  RectBtnTitle={'失物招领'}
                  RectBtnColor={'MainYellow'}
                />
              )}
            </View>

            <Text style={Style.Userdate}>
              {moment(item.createAt).format('M月D日 hh时mm分')}
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
                <RoundBtn
                  RoundBtnTitle={'联系TA'}
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
      </Card>
    </TouchableOpacity>
  );
}
