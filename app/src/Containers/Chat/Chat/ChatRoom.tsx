import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Styles from './ChatRoomStyle';
import Style from 'src/Style';
import Header from 'src/Components/Header/Header';
import {Images} from 'src/Theme';
import {store} from 'src/Store';
import Toast from 'react-native-simple-toast';
import {baseUrl} from 'src/config';

import {NavigationEvents} from 'react-navigation';
import axios from 'axios';

import {Colors} from 'src/Theme';

export default function ChatRoom(props) {
  const [state, dispatch] = useContext(store);
  const [content, setContent] = useState('');
  const [guest, setGuest] = useState(props.navigation.getParam('guest'));
  const [room, setRoom] = useState(props.navigation.getParam('room'));

  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);

  const getRooms = async () => {
    if (room === undefined || room === '') {
      console.log(
        state.user._id,
        guest._id,
        '========+++++++++++++++=========',
      );

      await axios
        .post(baseUrl + 'api/room', {
          uid1: state.user._id,
          uid2: guest._id,
        })
        .then(function(response) {
          if (response.data) {
            setRoom(response.data.item);
            console.log(response.data.item, '----room number');
            /////////////////////////////////////////////////
            const room_id = response.data.item._id;
            axios
              .get(baseUrl + 'api/message/', {
                params: {room_id, user_id: state.user._id},
              })
              .then(function(res) {
                dispatch({type: 'setMessages', payload: res.data.items});
                setLoading(false);
              })
              .catch(function(err) {
                console.log('from server error..........', err);
              })
              .finally(function() {
                // always executed
                console.log('anyway finished.....');
              });
            /////////////////////////////////////////////////
          } else {
            // Toast.show('失败了!');
            console.log('failed to create the room....');
          }
        })
        .catch(function(error) {
          // Toast.show('错误');
          console.log('failed to create the room with exception....', error);
        });
    } else {
      console.log('=======', state.user._id, guest._id, room, '=======');
    }
  };

  const handleSubmit = async () => {
    if (guest === null) {
      Toast.show('错误的接收者!');
      return;
    }

    if (content === '') {
      Toast.show('正确输入值！');
      return;
    }

    const msg = {
      user: state.user._id,
      room: room._id,
      content,
      receiver: guest._id,
    };

    await axios
      .post(baseUrl + 'api/message', msg)
      .then(function(response) {
        if (response.data) {
          dispatch({
            type: 'addMessage',
            payload: {
              user: state.user,
              content,
              createAt: new Date(),
            },
          });
          setContent('');
          // props.navigation.navigate('RoomList');
        } else {
          Toast.show('失败了!');
        }
      })
      .catch(function(error) {
        Toast.show('错误');
      });
  };

  const updateCheckedState = () => {
    if (!room || !guest) return;
    console.log('will update the state....', room._id, guest._id);
    axios
      .get(baseUrl + 'api/message/' + room._id, {
        params: {user_id: guest._id},
      })
      .then(function(response) {
        console.log('the msg checked-----------++++', response.data.msg);
      })
      .catch(function(error) {
        console.log('checked setting...', error);
      })
      .finally(function() {
        console.log('anyway finished, checked setting.');
      });
  };

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    updateCheckedState();
  }, [state.messages]);

  return (
    <>
      <NavigationEvents
        onDidFocus={() => {
          if (!state.user._id) props.navigation.navigate('Signin');
        }}
      />

      <Header
        back={() => props.navigation.goBack()}
        label={guest.name ? guest.name : ''}
      />

      {loading && (
        <View
          style={[
            Styles.GetStuffScreenContainer,
            {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
            },
          ]}>
          <ActivityIndicator size="large" color={Colors.btnBack} />
        </View>
      )}

      <ScrollView
        style={Styles.GetStuffScreenContainer}
        ref={scrollRef}
        onContentSizeChange={(contentWidth, contentHeight) => {
          scrollRef.current.scrollToEnd({animated: true});
        }}>
        <View style={{padding: 12}}>
          {state.messages &&
            state.messages.map((msg, i) => {
              return msg.user._id === state.user._id ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 5,
                    justifyContent: 'flex-end',
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.robinSEgg,
                      marginRight: 10,
                      marginLeft: 70,
                      padding: 3,
                      borderRadius: 3,
                    }}>
                    <Text>{msg.content}</Text>
                    <View
                      style={{
                        position: 'absolute',
                        right: -5,
                        top: 7,
                        width: 0,
                        height: 0,
                        borderTopColor: 'transparent',
                        borderTopWidth: 5,
                        borderLeftWidth: 5,
                        borderLeftColor: Colors.robinSEgg,
                        borderBottomWidth: 5,
                        borderBottomColor: 'transparent',
                      }}
                    />
                  </View>
                  <FastImage
                    style={{width: 33, height: 33, borderRadius: 50}}
                    source={
                      msg.user.photo
                        ? {
                            uri:
                              baseUrl + 'download/photo?path=' + msg.user.photo,
                          }
                        : Images.maleProfile
                    }
                    resizeMode="cover"
                  />
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 5,
                  }}>
                  <FastImage
                    style={{width: 33, height: 33, borderRadius: 50}}
                    source={
                      msg.user.photo
                        ? {
                            uri:
                              baseUrl + 'download/photo?path=' + msg.user.photo,
                          }
                        : Images.maleProfile
                    }
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      backgroundColor: '#fff',
                      marginLeft: 10,
                      marginRight: 70,
                      padding: 3,
                      borderRadius: 3,
                    }}>
                    <View
                      style={{
                        position: 'absolute',
                        left: -5,
                        top: 7,
                        width: 0,
                        height: 0,
                        borderTopColor: 'transparent',
                        borderTopWidth: 5,
                        borderRightWidth: 5,
                        borderRightColor: '#fff',
                        borderBottomWidth: 5,
                        borderBottomColor: 'transparent',
                      }}
                    />
                    <Text>{msg.content}</Text>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
      <View style={{flexDirection: 'row', margin: 5}}>
        <TextInput
          style={{
            flex: 7,
            height: 40,
            borderWidth: 0,
            backgroundColor: '#fff',
          }}
          underlineColorAndroid="transparent"
          placeholderTextColor="grey"
          numberOfLines={1}
          value={content}
          onChangeText={value => setContent(value)}
        />
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: Colors.active,
            marginLeft: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleSubmit}>
          <Text style={{color: '#fff'}}>发送</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
