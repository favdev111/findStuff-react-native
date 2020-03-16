import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images} from 'src/Theme';
import Style from './CardStyle';
import RoundBtn from 'src/Components/Buttons/RoundBtn/RoundBtn';
import RectBtn from 'src/Components/Buttons/RectBtn/RectBtn';
import {Card} from 'react-native-shadow-cards';
import moment from 'moment';
import {baseUrl} from 'src/config';
import Toast from 'react-native-simple-toast';
import {store} from 'src/Store';

import {dotedTitle} from 'src/utils';

export default function StuffCard({item, navigation}) {
  const [state, dispatch] = useContext(store);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('StuffPostDetail', {item});
      }}
      style={Style.CardWrap}>
      <Card style={{padding: 12, flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={Style.ImageSection}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserInfo', {item: item.user});
              }}>
              <FastImage
                style={Style.AvatarStyle}
                source={
                  item.user
                    ? item.user.photo
                      ? {
                          uri:
                            baseUrl + 'download/photo?path=' + item.user.photo,
                        }
                      : Images.maleProfile
                    : Images.maleProfile
                }
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 5}}>
            <View style={{flexDirection: 'column'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text>{dotedTitle(item.title)}</Text>
                  </View>
                  <View>
                    {item.kind === 'lost' && (
                      <RectBtn
                        RectBtnTitle={'寻物启事'}
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
                </View>
                <View style={{flexDirection: 'row', flex: 1}}>
                  {item.user._id === state.user._id && (
                    <View style={{flex: 11}}></View>
                  )}

                  <View style={{flex: 13}}>
                    {item.fee > 0 && (
                      <RoundBtn
                        RoundBtnTitle={'赏 ¥' + item.fee}
                        RoundBtnColor={'MainRed'}
                      />
                    )}
                  </View>

                  {item.user._id !== state.user._id && (
                    <View style={{flex: 11}}>
                      <RoundBtn
                        RoundBtnTitle={'联系TA'}
                        RoundBtnColor={'MainYellow'}
                        proc={() => {
                          if (!state.user._id) {
                            Toast.show('请登录！');
                            return;
                          }
                          if (item.user._id === state.user._id) {
                            Toast.show('这是你的帖子');
                            return;
                          }
                          navigation.navigate('ChatRoom', {
                            guest: item.user,
                          });
                        }}
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View>
              <Text style={Style.Userdate}>{item.phone}</Text>
            </View>
            <View>
              <Text style={Style.Userdate}>
                {moment(item.createAt).format('M月D日 hh时mm分')}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View style={Style.CardDesAndImgContainer}>
            <View style={Style.CardDescription}>
              <Text numberOfLines={3} style={Style.CardDescriptionText}>
                {item.description}
              </Text>
            </View>
            <View style={Style.CardImageSection}>
              {item.photos.length > 0 && (
                <FastImage
                  source={{
                    uri: baseUrl + 'download/photo?path=' + item.photos[0].path,
                  }}
                  style={Style.CardImage}
                />
              )}
            </View>
          </View>
          <View style={Style.CardLocation}>
            <View style={Style.CardLocationGroup}>
              <FastImage
                style={Style.CardLocationImg}
                source={Images.BlueMapIcon}
              />
              <Text style={Style.CardLocationText}>{item.place}</Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
