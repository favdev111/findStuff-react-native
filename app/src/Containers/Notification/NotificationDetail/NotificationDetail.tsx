import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images, Colors} from 'src/Theme';
import Styles from './NotificationDetailStyle';
import Style from 'src/Style';
import Header from 'src/Components/Header/Header';

import moment from 'moment';

export default function StuffPostDetail({navigation}) {
  const [item, setItem] = useState(navigation.getParam('item'));
  useEffect(() => {}, []);

  return (
    <>
      <ScrollView style={{backgroundColor: '#f4f6f8'}}>
        <View>
          <Header back={() => navigation.goBack()} label={'详情'} />

          <View style={Styles.UserInfoContainer}>
            <View style={Styles.AvatarContainer}>
              <View style={Styles.AvatarPhotoContainer}>
                <FastImage
                  style={Styles.AvatarPhoto}
                  source={Images.maleProfile}
                />

                <View style={Styles.UserNameContainer}>
                  <View style={Styles.UserNameWrap}>
                    <View>
                      <Text>{'管理员'}</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={{color: Colors.grey}}>
                      {moment(item.createAt).format('M月D日 ')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={Styles.StuffInfoContainer}>
            <View>
              <Text style={{color: Colors.grey}}>{item.content}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
