import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images, Colors} from 'src/Theme';
import Styles from './CategoryDetailStyle';
import Style from 'src/Style';
import Header from 'src/Components/Header/Header';
import {store} from 'src/Store';
import moment from 'moment';
import {baseUrl} from 'src/config';
import RoundBtn from 'src/Components/Buttons/RoundBtn/RoundBtn';
import {NavigationEvents} from 'react-navigation';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import DialogInput from 'react-native-dialog-input';

export default function StuffPostDetail({navigation}) {
  const [state, dispatch] = useContext(store);
  const [item, setItem] = useState(navigation.getParam('item'));
  const [dlgVisible, setDlgVisible] = useState(false);

  const sendMsg = item => {
    if (!state.user._id) {
      Toast.show('请登录！');
      return;
    }
    if (item.user._id === state.user._id) {
      Toast.show('这是你的帖子');
      return;
    }
    navigation.navigate('ChatRoom', {guest: item.user});
  };

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

    if (item.user._id === state.user._id) {
      Toast.show('错误');
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

  const canReport = () => {
    if (state.user._id === undefined) {
      navigation.navigate('Signin');
      return false;
    }
    if (!item.user || item.user._id === state.user._id) {
      Toast.show('错误');
      return false;
    }

    let ret = true;

    item.reports.map(report => {
      if (report.user === state.user._id) {
        ret = false;
      }
    });

    if (!ret) Toast.show('您已经举报了。');
    return ret;
  };

  const checkReport = () => {
    const couldI = canReport();
    if (couldI) setDlgVisible(true);
  };

  const reportPost = report => {
    if (state.user._id === undefined) {
      navigation.navigate('Signin');
      return;
    }

    axios
      .post(baseUrl + 'api2/stuffpost/report', {
        post_id: item._id,
        user_id: state.user._id,
        report,
      })
      .then(function(response) {
        if (response.data.item) {
          setItem(response.data.item);
        }
        Toast.show('成功');
      })
      .catch(function(error) {
        console.log(error, 'fromthe report fasdf');
        console.log(error);
        Toast.show('错误');
      })
      .finally(function() {
        // always executed
      });
  };

  return (
    <>
      <NavigationEvents
        onDidFocus={() => {
          increaseBrowseCnt();
          dispatch({type: 'setCurrentScreen', payload: 'post-detail'});
        }}
      />
      <ScrollView style={{backgroundColor: '#f4f6f8'}}>
        <View>
          <Header back={() => navigation.goBack()} label={'详情'} />

          <View style={Styles.UserInfoContainer}>
            <View style={Styles.AvatarContainer}>
              <View style={Styles.AvatarPhotoContainer}>
                <FastImage
                  style={Styles.AvatarPhoto}
                  source={
                    item.user
                      ? item.user.photo
                        ? {
                            uri:
                              baseUrl +
                              'download/photo?path=' +
                              item.user.photo,
                          }
                        : Images.maleProfile
                      : Images.maleProfile
                  }
                  resizeMode="cover"
                />
                <View style={{flex: 3}}></View>
              </View>
              <View style={Styles.UserNameContainer}>
                <View style={Styles.UserNameWrap}>
                  <View>
                    <Text>{item.title}</Text>
                  </View>
                </View>
                <View style={{paddingTop: 5}}>
                  <Text style={{color: Colors.grey, fontSize: 12}}>
                    {item.phone}
                  </Text>
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
                  <FastImage
                    source={Images.BlueMapIcon}
                    style={Styles.UserLocationImg}
                  />
                  <Text style={{color: Colors.grey, paddingLeft: 5}}>
                    {item.place}
                  </Text>
                </View>
              </View>
              <View style={{flex: 2, flexDirection: 'column'}}>
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
                  {item.user._id !== state.user._id && (
                    <RoundBtn
                      RoundBtnTitle={'联系TA'}
                      RoundBtnColor={'MainYellow'}
                      proc={() => sendMsg(item)}
                    />
                  )}
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
              {item.photos.length > 0 &&
                item.photos.map((photo, i) => (
                  <FastImage
                    key={i}
                    source={{
                      uri: baseUrl + 'download/photo?path=' + photo.path,
                    }}
                    style={Styles.StuffImg}
                  />
                ))}
            </View>
            <View style={Styles.StuffReportContainer}>
              <TouchableOpacity
                onPress={() => {
                  checkReport();
                }}>
                {item.user._id !== state.user._id && (
                  <Text style={{color: Colors.grey}}>举报</Text>
                )}
              </TouchableOpacity>

              <View>
                <Text style={{color: Colors.grey}}>浏览{item.browse}次</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <DialogInput
        isDialogVisible={dlgVisible}
        title={'举报'}
        message={'我之所以举报，是因为'}
        hintInput={''}
        submitInput={inputText => {
          if (inputText === '') {
            Toast.show('请输入内容');
            return;
          }
          reportPost(inputText);
          setDlgVisible(false);
        }}
        closeDialog={() => {
          setDlgVisible(false);
        }}
        cancelText={'取消'}
        submitText={'确认'}></DialogInput>
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
