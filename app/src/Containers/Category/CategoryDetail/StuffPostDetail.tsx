import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {Images, Colors} from 'src/Theme';
import Styles from './CategoryDetailStyle';
import {store} from 'src/Store';
import moment from 'moment';
import {baseUrl} from 'src/constants';
import RoundBtn from 'src/Components/Buttons/RoundBtn/RoundBtn';
import axios from 'axios';

export default function StuffPostDetail({navigation}) {
  const [state, dispatch] = useContext(store);
  const [item, setItem] = useState(navigation.getParam('item'));

  const increaseBrowseCnt = () => {
    axios
      .post(baseUrl + 'api2/stuffpost/browse', {_id: item._id})
      .then(function(response) {
        if (response.data.item) {
          setItem(response.data.item);
        }
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  };

  const increaseLikesCnt = () => {
    if (state.user._id === undefined) {
      navigation.navigate('Signin');
      return;
    }

    axios
      .post(baseUrl + 'api2/stuffpost/likes', {
        post_id: item._id,
        user_id: state.user._id,
      })
      .then(function(response) {
        if (response.data.item) {
          setItem(response.data.item);
        }
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  };

  useEffect(() => {
    increaseBrowseCnt();
  }, []);

  return (
    <>
      <ScrollView style={{backgroundColor: '#f4f6f8'}}>
        <View>
          <View style={Styles.FindStuffHeaderContainer}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => navigation.navigate('StuffPostView')}>
              <Image
                source={Images.whiteLeftChevron}
                style={Styles.FindStuffHeaderImg}
              />
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 20, color: '#fff'}}>详情</Text>
            </View>
            <View style={{flex: 1}}></View>
          </View>
          <View style={Styles.UserInfoContainer}>
            <View style={Styles.AvatarContainer}>
              <View style={Styles.AvatarPhotoContainer}>
                {(!item.user || !item.user.photo) && (
                  <Image
                    style={Styles.AvatarPhoto}
                    source={Images.maleProfile}
                    resizeMode="cover"
                    borderRadius={30}
                  />
                )}
                {item.user && item.user.photo && item.user.photo.length > 0 && (
                  <Image
                    style={Styles.AvatarPhoto}
                    // source={{
                    //   uri: baseUrl + 'download/photo?path=' + item.user.photo,
                    // }}
                    source={Images.maleProfile}
                    resizeMode="cover"
                    borderRadius={30}
                  />
                )}
                <View style={{flex: 3}}></View>
              </View>
              <View style={Styles.UserNameContainer}>
                <View style={Styles.UserNameWrap}>
                  <View>
                    {item.user?.name && <Text>{item.user.name}</Text>}
                  </View>
                </View>
                <View style={{paddingTop: 5}}>
                  <Text style={{color: Colors.grey, fontSize: 12}}>
                    {moment(item.createAt).format('M月D日 hh时mm分')}
                  </Text>
                </View>
                {item.fee > 0 && (
                  <View style={{paddingTop: 5}}>
                    <Text style={{color: Colors.red, fontSize: 12}}>
                      {'赏 ¥ '}
                      {item.fee}
                    </Text>
                  </View>
                )}
                <View style={Styles.UserLocationContainer}>
                  <Image
                    source={Images.BlueMapIcon}
                    style={Styles.UserLocationImg}
                  />
                  <Text style={{color: Colors.grey, paddingLeft: 5}}>
                    {item.place}
                  </Text>
                </View>
              </View>
              <View style={{flex: 2, flexDirection: 'column'}}>
                <View style={{flex: 1}}></View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-around',
                  }}>
                  {item.fee > 0 && (
                    <View style={Styles.FeeBtn}>
                      <View style={Styles.FeeBtn2}>
                        <View style={Styles.FeeBtn3}>
                          <Text style={{color: '#fff'}}>赏</Text>
                        </View>
                      </View>
                    </View>
                  )}
                  {item.kind === 'found' && (
                    <View style={Styles.PickBtn}>
                      <Text style={{color: '#fff'}}>拾</Text>
                    </View>
                  )}
                  {item.kind === 'lost' && (
                    <View style={Styles.LostBtn}>
                      <Text style={{color: '#fff'}}>丢</Text>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <RoundBtn
                    RoundBtnTitle={'联系TA'}
                    RoundBtnColor={'MainYellow'}
                  />
                </View>
                <View style={{flex: 1}}></View>
              </View>
            </View>
          </View>
          <View style={Styles.StuffInfoContainer}>
            <View>
              <Text style={{color: Colors.grey}}>{item.description}</Text>
            </View>
            <View style={Styles.StuffImgContainer}>
              {item.photos.map((photo, i) => (
                <Image
                  key={i}
                  source={{
                    uri: baseUrl + 'download/photo?path=' + photo.path,
                  }}
                  style={Styles.StuffImg}
                />
              ))}
            </View>
            <View style={Styles.StuffReportContainer}>
              <View>
                <Text style={{color: Colors.grey}}>举报</Text>
              </View>
              <View>
                <Text style={{color: Colors.grey}}>浏览{item.browse}次</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={Styles.CommentInputContainer}>
        <View style={Styles.CommentInputWrap}></View>
        <TouchableOpacity
          style={Styles.LikeCommentContainer}
          onPress={increaseLikesCnt}>
          <Image source={Images.RedLike} />
          <Text>{item.likes.length}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
