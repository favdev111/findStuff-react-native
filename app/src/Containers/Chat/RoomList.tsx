import React, {useEffect, useContext} from 'react';
import {ScrollView, View, Text, TouchableOpacity, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import Styles from './RoomListStyle';
import Style from 'src/Style';
import Header from 'src/Components/Header/Header';
import {Images, Colors} from 'src/Theme';
import {store} from 'src/Store';
import {baseUrl} from 'src/config';
import moment from 'moment';
import axios from 'axios';
import { BackHandler } from 'react-native';

import {NavigationEvents} from 'react-navigation';

const RoomList = props => {
  const [state, dispatch] = useContext(store);

  const getList = () => {
    axios
      .get(baseUrl + 'api/room', {
        params: {
          user_id: state.user._id,
        },
      })
      .then(function(response) {
        console.log(response.data.items, 'rooms data.................');
        dispatch({type: 'setRooms', payload: response.data.items});
      })
      .catch(function(error) {
        console.log('get room data error....', error);
      })
      .finally(function() {
        // always executed
      });
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.navigate('AppHome');
      return true;

    });
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('willFocus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        props.navigation.navigate('AppHome');
        return true;

      });
    });

    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('willBlur', () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        props.navigation.navigate('AppHome');
        return true;

      });
    });

    return unsubscribe;
  }, [props.navigation]);

  return (
    <>
      <NavigationEvents
        onDidFocus={() => {
          if (!state.user._id) props.navigation.navigate('Signin');
          else {
            getList();
            dispatch({type: 'setCurrentScreen', payload: 'room-list'});
          }
        }}
      />

      <Header
        back={() => props.navigation.navigate('AppHome')}
        label={'私信'}
      />

      <ScrollView style={Styles.GetStuffScreenContainer}>
        <View style={Styles.MessageListContainer}>
          {state.rooms.length === 0 && (
            <View
              style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
              <Text>没有讯息</Text>
            </View>
          )}
          <FlatList
            horizontal={false}
            data={state.rooms}
            renderItem={({item}) =>
              item.users[0] &&
              item.users[1] && (
                <TouchableOpacity
                  style={Styles.MessageListWrap}
                  onPress={() => {
                    dispatch({type: 'setMessages', payload: []});
                    props.navigation.navigate('ChatRoom', {
                      guest:
                        state.user._id === item.users[0]._id
                          ? item.users[1]
                          : item.users[0],
                    });
                  }}>
                  <View style={Styles.MessageListAvatarWrap}>
                    <View style={{flexDirection: 'column'}}>
                      <View style={{flex: 1, marginRight: 5}}>
                        {item._id && (
                          <FastImage
                            source={
                              item._id.photo
                                ? {
                                    uri:
                                      baseUrl +
                                      'download/photo?path=' +
                                      item._id.photo,
                                  }
                                : Images.maleProfile
                            }
                            style={Styles.MessageListAvatar}
                            resizeMode="cover"
                          />
                        )}
                        {item.missed > 0 && (
                          <View style={Styles.AvatarBadgeContainer}>
                            <Text style={{color: '#fff', fontSize: 10}}>
                              {item.missed}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                    <View style={{flex: 1}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text>
                          {state.user._id === item.users[0]._id
                            ? item.users[1].name
                            : item.users[0].name}
                        </Text>
                        <Text style={{color: Colors.grey}}>
                          {moment(item.updateAt).format('M月D日 hh时mm分')}
                        </Text>
                      </View>
                      <Text numberOfLines={2} style={{color: Colors.grey}}>
                        {item.label}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default RoomList;
