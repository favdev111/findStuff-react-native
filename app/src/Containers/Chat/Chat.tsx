import React, {useState, useEffect, useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './ChatStyle';
import {Images, Colors} from 'src/Theme';
import {store} from 'src/Store';
import {baseUrl} from 'src/constants';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import axios from 'axios';
import withAuth from 'src/withAuth';

const Chat = props => {
  const [state, dispatch] = useContext(store);
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + 'api/message', {
        params: {},
      })
      .then(function(response) {
        setList(response.data);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }, []);

  return (
    <ScrollView style={Styles.GetStuffScreenContainer}>
      <View style={Styles.FindStuffHeaderContainer}>
        <Text style={{fontSize: 20, color: '#fff'}}>私信</Text>
      </View>
      <View style={Styles.MessageListContainer}>
        <FlatList
          horizontal={false}
          data={list}
          renderItem={({item}) => (
            <TouchableOpacity
              style={Styles.MessageListWrap}
              onPress={() => {
                if (!item.sender) {
                  Toast.show('No information');
                  return;
                }
                props.navigation.navigate('ChatDetail', {
                  item: item.sender,
                  msg: item,
                });
              }}>
              <View style={Styles.MessageListAvatarWrap}>
                <View style={Styles.MessageListImgWrap}>
                  {!item.sender && (
                    <Image
                      source={Images.maleProfile}
                      style={Styles.MessageListAvatar}
                    />
                  )}
                  {item.sender && (
                    <Image
                      source={{
                        uri:
                          baseUrl + 'download/photo?path=' + item.sender.photo,
                      }}
                      style={Styles.MessageListAvatar}
                    />
                  )}
                  <View style={Styles.AvatarBadgeContainer}>
                    <Text style={{color: '#fff'}}>2</Text>
                  </View>
                </View>
                <View>
                  <Text>{item.sender ? item.sender.name : ''}</Text>
                  <Text style={{color: Colors.grey}}>{item.content}</Text>
                </View>
              </View>
              <Text style={{color: Colors.grey}}>
                {moment(item.createAt).format('M月D日 ')}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScrollView>
  );
};

export default withAuth(Chat);
